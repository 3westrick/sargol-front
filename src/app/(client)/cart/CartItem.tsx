"use client"
import { deleteItem, updateItem } from '@/api/client/orders/orderAPI'
import { Box, Button, Divider, TextField, Typography } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import {debounce} from '@mui/material/utils'

type FormValue = {
    id: number,
    quantity: string,
    product: number
}

const CartItem = ({item, verify_coupons}: {item: any, verify_coupons: any}) => {

    const queryClient = useQueryClient()

    const update_item = useMutation({
        mutationFn:(data: FormValue) => updateItem(data),
        onSuccess: (res, val) => {
            queryClient.invalidateQueries({queryKey: ['items']})
            verify_coupons()
        }
    })

    const delete_item = useMutation({
        mutationFn:() => deleteItem(item.id),
        onSuccess: (res) => {
            queryClient.invalidateQueries({queryKey: ['items']})
        }
    })

    const methods = useForm<FormValue>({
        defaultValues:{
            id: item.id,
            quantity: item.quantity,
            product: item.product.id
        }
    })

    const {handleSubmit, register, getValues, setValue} = methods

    const update_debounce= debounce(() => {
        const value = getValues('quantity');
        
        if(parseInt(value) > 0){
            update_item.mutate({
                id: getValues('id'),
                quantity: value,
                product: getValues('product'),
            })
        }else{
            delete_item.mutate()
        }
    }, 400)


    function increase() {
        const value = parseInt(getValues('quantity'))
        update_debounce()
        setValue('quantity', `${value + 1}`)
    }

    function decrease() {
        const value = parseInt(getValues('quantity'))
        if (value > 0){
            update_debounce()
            setValue('quantity', `${value - 1}`)
        }   
    }

    function handle_change(value: string){
        if (parseInt(value) > 0){
            update_debounce()
            setValue('quantity', value)
        } else{
            setValue('quantity', getValues('quantity'))
        }
    }

    function handle_submit (data: FormValue) {
        console.log(data)
    }

    const on_sale = item.product.sale_price != 0;

    function get_price(){
        return item.product.regular_price * item.quantity
    }

    function get_sale_price(){
        return item.product.sale_price * item.quantity
    }

    return (
        <Box>
            <Divider/>
            <Box>{item.product.title}</Box>
            <form onSubmit={handleSubmit(handle_submit)}>
                <Box display={'flex'} alignItems={'center'} gap={2}>
                    <Button variant='outlined' onClick={decrease}>-</Button>
                    <TextField {...register('quantity')} onChange={e => handle_change(e.target.value)}/>
                    <Button variant='outlined' onClick={increase}>+</Button>
                    <Typography>
                        Price: {on_sale ? 
                        <><del>{get_price()}</del> <span>{get_sale_price()}</span> </>: 
                        <span>{get_price()}</span>
                        }
                    </Typography>
                </Box>
            </form>
        </Box>
    )
}

export default CartItem
