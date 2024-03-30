"use client"
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import dayjs from "dayjs"
import { Box, Button } from '@mui/material'
import CouponForm from './components/CouponForm'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getCoupon, updateCoupon } from '@/api/admin/coupons/couponAPI'
type FormValue = {
    id : number,
    title : string,
    description: string,
    type : string,

    amount : number,
    free_shipping : boolean,
    expired_at : any,

    minimum : number | string,
    maximum : number | string,
    individual_use : boolean,
    exclude_sale_items : boolean,

    products : any[],
    exclude_products : any[],
    
    categories : any[],
    exclude_categories : any[],

    allowed_users : any[],

    usage_limit : number | string,
    item_limit : number | string,
    user_limit : number | string,
}

const CouponEdit = ({couponId}: {couponId : number}) => {

    const {data: coupon} = useQuery({
        queryKey: ['admin-coupons', couponId],
        queryFn: () => getCoupon(couponId),
    })

    
    const methods = useForm<FormValue>({
        defaultValues: {
            id : coupon.id,
            title : coupon.title,
            description : coupon.description,
            type : coupon.type,
        
            amount : coupon.amount,
            free_shipping : coupon.free_shipping,
            expired_at : coupon.expired_at,
        
            minimum : coupon.minimum == -1 ? '' : coupon.minimum,
            maximum : coupon.maximum == -1 ? '' : coupon.maximum,
            individual_use : coupon.individual_use,
            exclude_sale_items : coupon.exclude_sale_items,
        
            products : coupon.products,
            exclude_products : coupon.exclude_products,
            
            categories : coupon.categories,
            exclude_categories : coupon.exclude_categories,
        
            allowed_users : coupon.allowed_users,
        
            usage_limit : coupon.usage_limit == -1 ? '' : coupon.usage_limit,
            item_limit : coupon.item_limit == -1 ? '' : coupon.item_limit,
            user_limit : coupon.user_limit == -1 ? '' : coupon.user_limit,
        }
    })

    const {handleSubmit} = methods

    const queryClient = useQueryClient()

    const edit_coupon = useMutation({
        mutationFn: (data: FormValue) => updateCoupon(data),
        onSuccess:(res) => {
            queryClient.invalidateQueries({queryKey: ['admin-coupons', couponId]})
        }
    })

    function onSubmit(data: FormValue){
        data.allowed_users = data.allowed_users.map(item => item.id)
        data.products = data.products.map(item => item.id)
        data.exclude_products = data.exclude_products.map(item => item.id)
        data.categories = data.categories.map(item => item.id)
        data.exclude_categories = data.exclude_categories.map(item => item.id)

        data.minimum = data.minimum == '' ? -1 : data.minimum
        data.maximum = data.maximum == '' ? -1 : data.maximum
        data.usage_limit = data.usage_limit == '' ? -1 : data.usage_limit
        data.item_limit = data.item_limit == '' ? -1 : data.item_limit
        data.user_limit = data.user_limit == '' ? -1 : data.user_limit

        // console.log(data)
        edit_coupon.mutate(data)
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

export default CouponEdit
