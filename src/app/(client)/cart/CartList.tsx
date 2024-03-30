'use client'
import { getItems, purchase, verifyCoupon, verifyCoupons } from '@/api/client/orders/orderAPI'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import CartItem from './CartItem'
import { useForm } from 'react-hook-form'

const CartList = () => {
    const items = useQuery({
        queryKey: ['items'],
        queryFn:() => getItems()
    })
    const {data} = items
    const [error, setError] = useState("")
    const [fullprice, setPrice] = useState("")
    const [coupons, setCoupon] = useState<any>([])

    const methods = useForm({
        defaultValues: {
            title: ''
        }
    })
    const {handleSubmit: couponSubmit, register: couponRegister} = methods

    const submit_coupon = useMutation({
        mutationFn: (data: any) => verifyCoupon(data),
        onSuccess: (res) => {
            if (res.error) {
                setError(res.error); 
                setPrice("")
                return;
            }
            setError(""); 
            setPrice(res.price)
            setCoupon([...coupons, res.coupon])
        }
    })

    const verify_coupons = useMutation({
        mutationFn: (data: any) => verifyCoupons(data),
        onSuccess: (res) => {
            if (res.error) {
                setError(res.error); 
                setPrice("")
                return;
            }
            setError(""); 
            setPrice(res.price)
            // setCoupon([...coupons, res.coupon])
        }
    })

    function handle_verify_coupons(){
        verify_coupons.mutate({
            coupons: coupons.map((item: any) => item.id)
        })
    }

    const purchase_mutation = useMutation({
        mutationFn: (data: any) => purchase(data),
        onSuccess: (res) => {
            if(res.error){
                console.log(res.error)
            }
            else
            console.log("Successful")
        }
    })

    function handle_coupon(data: any){
        submit_coupon.mutate({
            title: data.title,
            coupons: {
                coupons: coupons.map((item: any) => item.id)
            },
        })
    }

    function handle_purchase(){
        purchase_mutation.mutate({
            coupons: coupons.map((item: any) => item.id)
        })
    }

    
    function get_full_price(){
        let price = 0
        data.map((item: any) => {
            price = price + (item.product.regular_price * item.quantity)
        })
        return price
    }

    function get_price(){
        let price = 0

        data.map((item: any) => {
            if (item.product.sale_price != 0){
                price = price + (item.product.sale_price * item.quantity)
            }else{
                price = price + (item.product.regular_price * item.quantity)
            }
            
        })
            
        return price
    }
    
    return (
        <Box>
            Cart Items
            <Box>
                <Typography>
                    {error}
                </Typography>
            </Box>
            <Box>
                <Stack gap={2}>
                    {data.map((item: any) => <CartItem key={item.id} item={item} verify_coupons={handle_verify_coupons}/>)}
                </Stack>
            </Box>
            <Box>
                {/* <Typography>Price: {get_full_price()}</Typography>
                <Typography>Final Price: {get_final_price()}</Typography> */}
            </Box>

            <Box>
                {coupons.map((coupon: any) => <Typography key={coupon.id}>{coupon.title}</Typography>)}
            </Box>

            <Box>
                <form onSubmit={couponSubmit(handle_coupon)}>
                    <TextField label={'Coupon'} {...couponRegister('title')}/>
                    <Button type='submit' variant='outlined'>Apply Coupon</Button>
                </form>
            </Box>
            
            <Box>
                <Typography>Price: {get_price()}</Typography>
                {fullprice != "" && <Typography>Final price : {fullprice}</Typography>}
            </Box>

            <Box>
                <Button onClick={handle_purchase} variant='contained'>
                    Purchase
                </Button>
            </Box>
        </Box>
    )
}

export default CartList
