"use client"
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import dayjs from "dayjs"
import { Box, Button } from '@mui/material'
import CouponForm from './components/CouponForm'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCoupon } from '@/api/admin/coupons/couponAPI'
type FormValue = {
    id : number,
    title : string,
    description: string,
    type : string,

    amount : number,
    free_shipping : boolean,
    expired_at : any,

    minimum : number,
    maximum : number,
    individual_use : boolean,
    exclude_sale_items : boolean,

    products : any[],
    exclude_products : any[],
    
    categories : any[],
    exclude_categories : any[],

    allowed_users : any[],

    usage_limit : number,
    item_limit : number,
    user_limit : number,
}

const CouponCreate = () => {
    
    const methods = useForm<FormValue>({
        defaultValues: {
            id : undefined,
            title : '',
            type : 'percentage',
        
            // amount : 0,
            free_shipping : false,
            // expired_at : dayjs(),
        
            // minimum : 0,
            // maximum : 0,
            individual_use : false,
            exclude_sale_items : false,
        
            products : [],
            exclude_products : [],
            
            categories : [],
            exclude_categories : [],
        
            allowed_users : [],
        
            // usage_limit : 0,
            // item_limit : 0,
            // user_limit : 0,
        }
    })

    const {handleSubmit} = methods

    
    const queryClient = useQueryClient()

    const create_coupon = useMutation({
        mutationFn: (data: FormValue) => createCoupon(data),
        onSuccess:(res) => {
            queryClient.invalidateQueries({queryKey: ['admin-coupons']})
        }
    })

    function onSubmit(data: FormValue ){
        data.allowed_users = data.allowed_users.map(item => item.id)
        data.products = data.products.map(item => item.id)
        data.exclude_products = data.exclude_products.map(item => item.id)
        data.categories = data.categories.map(item => item.id)
        data.exclude_categories = data.exclude_categories.map(item => item.id)
        // console.log(data)
        create_coupon.mutate(data)
    }

    return (
        <Box>
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CouponForm/>
                <Button type='submit'>Submit</Button>
            </form>
        </FormProvider>
        </Box>
    )
}

export default CouponCreate
