'use client'
import { getItems, purchase, updateBasket, verifyCoupon, verifyCoupons } from '@/api/client/orders/orderAPI'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import CartItem from './CartItem'
import { set, useForm } from 'react-hook-form'
import { client_coupons, client_coupons_price, client_sub_total } from '@/Atoms'
import { useAtom } from 'jotai'
import Link from 'next/link'
import CartShipping from './CartShipping'
import { getProductWithId, getProductWithIds } from '@/api/client/products/productAPI'
import { v4 } from 'uuid'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import {useLocalStorage} from '@/hooks/useLocalStorage'

const CartList = () => {
    const items_query = useQuery({
        queryKey: ['items'],
        queryFn:() => getItems()
    })

    const {data:items_data, isLoading} = items_query

    // const [local_items, set_local_items] = useState([])
    const [items, set_items] = useState([])
    const {data:session} = useSession()
    
    const product_mutate = useMutation({
        mutationFn: (data) => getProductWithIds(data),
        onSuccess: (res, data) => {
            if (!session){
                let basket_p = localStorage.getItem('basket')
                if (basket_p){
                    let basket = JSON.parse(basket_p)
                    
                    basket = basket.map((item: any) => {
                        return {
                            ...item,
                            product: res.find((product: any) => item.product == product.id),
                            id: v4()
                        }
                    })
                    set_items(basket)
                }else{
                    console.log('object')
                }
            }

        }
    })

    useEffect(() => {
        
        if (items_data && session){
            set_items(items_data.items)
        }else{
            let basket_p = localStorage.getItem('basket')
            
            if (basket_p){
                let basket = JSON.parse(basket_p)
                let productsId = basket.map((item: any) => item.product).join(',')
                product_mutate.mutate(productsId)
            }else{
                set_items([])
            }
        }
    }, [items_data])

    const [error, setError] = useState("")
    const [sub_total_price, set_sub_total_price] = useAtom(client_sub_total)
    const [discounted_price, set_discounted_price] = useAtom(client_coupons_price)
    const [coupons, setCoupon] = useAtom(client_coupons)
    

    // const [storage_sub_total_price, set_storage_sub_total_price] = useLocalStorage('sub_total', '')
    // const [storage_discounted_price, set_storage_discounted_price] = useLocalStorage('discounted_price', '')
    // const [storage_coupons, set_storage_coupons] = useLocalStorage('coupons', [])

    const [canPurchase, setCanPurchase] = useState(true)

    const methods = useForm({
        defaultValues: {
            title: ''
        }
    })
    const {handleSubmit: couponSubmit, register: couponRegister} = methods

    const submit_coupon = useMutation({
        // TODO handle different errors ( like after entering duplicate code, reaching the limits )
        mutationFn: (data: any) => verifyCoupon(data),
        onSuccess: (res, data) => {
            if (res.error) {
                setError(res.error.detail); 
                set_discounted_price("")
                return;
            }
            setError(""); 
            set_discounted_price(res.price)
            setCoupon([...coupons, res.coupon])
        },
        onError: () => {
            console.log(22)
        }
    })


    const verify_coupons = useMutation({
        // TODO handle difrent errors ( like after entering duplicate code, reaching the limits )
        mutationFn: (data: any) => verifyCoupons(data),
        onSuccess: (res) => {
            if (res.error) {
                setError(res.error.detail); 
                setCanPurchase(false)
                set_discounted_price("")
                return;
            }
            setError(""); 
            set_discounted_price(res.price)
            setCanPurchase(true)
            // setCoupon([...coupons, res.coupon])
        }
    })

    
    function handle_verify_coupons(){
        if (coupons.length > 0){
            const basket_ = localStorage.getItem('basket')
            if (basket_){
                verify_coupons.mutate({
                    coupons: coupons.map((item: any) => item.id),
                    basket: JSON.parse(basket_)
                })
            }else{
                verify_coupons.mutate({
                    coupons: coupons.map((item: any) => item.id),
                })
            }
            
        }
    }


    function handle_coupon(data: any){
        if (data.title == null || data.title == '') {
            setError("Please enter a code.")
            return;
        }
        
        if(session){
            submit_coupon.mutate({
                title: data.title,
                coupons: coupons.map((item: any) => item.id)
            })
        }else{
            const basket_ = localStorage.getItem('basket')
            if(basket_){
                const basket = JSON.parse(basket_)
                submit_coupon.mutate({
                    title: data.title,
                    coupons: coupons.map((item: any) => item.id),
                    basket: basket,
                })
            }
        } 

    }


    const router = useRouter()

    const proceed_mutation = useMutation({
        mutationFn: (data:any) => updateBasket(data),
        onSuccess: (res, data) => {
            // TODO: add get_price() to localstorage
            // full price = get_price()
            // discounted price = discounted_price()
            // if (!session){
            //     set_storage_sub_total_price(get_price())
            //     set_storage_discounted_price(discounted_price)
            //     set_storage_coupons(coupons)
            // }
            
            router.push('/checkout')
        }
    })

    
    function handleProceed(){
        proceed_mutation.mutate({
            coupons: coupons.map((coupon: any) => coupon.id),
            sub_total: get_price(),
            discounted_price: discounted_price,
            coupons_instance: coupons
        })
        // console.log(get_price())
        // console.log(coupons.map((coupon: any) => coupon.id))
    }
    

    function get_price(){
        let price = 0
        items?.map((item: any) => {
            if (item.product.sale_price != 0){
                price = price + (item.product.sale_price * item.quantity)
            }else{
                price = price + (item.product.regular_price * item.quantity)
            }
            
        })
        return price
    }

    useEffect(() => {
        handle_verify_coupons()
    },[])
    
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
                    {items?.map((item: any) => <CartItem key={item.id} item={item} set_items={set_items} verify_coupons={handle_verify_coupons}/>)}
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
                {discounted_price != "" && <Typography>Final price : {discounted_price}</Typography>}
            </Box>

            {/* <CartShipping/> */}

            <Box mt={3}>
                <Button variant='contained' sx={{textTransform:'unset'}} disabled={!canPurchase} onClick={handleProceed}>
                        Proceed to checkout
                </Button>
            </Box>
        </Box>
    )
}

export default CartList
