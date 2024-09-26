"use client"
import { getProductWithSlug } from '@/api/client/products/productAPI'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { createItem } from '@/api/client/orders/orderAPI'
import ProductAddQuantity from './components/ProductAddQuantity'
import { url_query } from '@/utils/urls'
import { auth } from '@/lib/auth'
import {v4} from 'uuid'

type FormValue = {
    quantity: number,
    product: number
}

const ProductSingleSimple = ({slug}: {slug: string}) => {
    const product = useQuery({
        queryKey: ['products', slug],
        queryFn:() => getProductWithSlug(slug)
    })

    const methods = useForm<FormValue>({
        defaultValues: {
            quantity: 1
        }
    })

    

    const { setValue, handleSubmit } = methods


    const {data, } = product

    const value_ids = data.values.map((item: any) => item.id)

    const single_product = true
    let can_purchase = single_product
    
    const gallery = []
    let price = ""
    let sale_price = ""
    let stock_status = ""

    
    gallery.push(data.image)
    data.gallery.map((image: any) => gallery.push(image.image))
    price = data.regular_price
    sale_price = data.sale_price

    if (data.stock_management){
        
        if (data.quantity == 0 || data.quantity == null){
            
            if(data.backorder == 'not_allow'){
                stock_status = 'Out of stock'
                can_purchase = false
            }else if (data.backorder == 'notify') {
                stock_status = 'On backorder'
            }else if (data.backorder == 'allow') {
                
            }
        }
    }else{
        if (data.stock_status == 'in_stock'){

        }else if (data.stock_status == 'out_of_stock'){
            stock_status = 'Out of stock'
            can_purchase = false
        }else if (data.stock_status == 'on_backorder'){
            stock_status = 'On backorder'
        }
    }

    

    const add_to_basket = useMutation({
        mutationFn: (data:FormValue) => createItem(data),
        onSuccess: (res, data) => {
            if (res){
                console.log("added to basket")
            }else{
                
                let basket_json = localStorage.getItem('basket')
                if (basket_json){
                    let basket = JSON.parse(basket_json)
                    const product = basket.find((item: any) => data.product == item.product)
                    if (product){
                        basket = basket.filter((item: any) => data.product != item.product)
                    }
                    basket.push({
                        ...data,
                        id: v4(),
                    })
                    localStorage.setItem('basket', JSON.stringify(basket))
                }else{
                    localStorage.setItem('basket', JSON.stringify([
                        {...data, id: v4()}
                    ]))
                }
                
            }
        }
    })


    function handle_submit(formData:FormValue){
        if (can_purchase){
            formData.product = data.id
            add_to_basket.mutate(formData)
        }
    }


    return (
        <div>
            <Box>
                <Typography>{data.title}</Typography>
            </Box>
            <Box>
                {/* <Typography>{color}</Typography> */}
            </Box>


            <Box>
                {parseInt(sale_price) == 0 ? <Typography>Price: {price}</Typography> : (
                        <Typography>Price: <del>{price}</del> {sale_price}</Typography>
                    )
                }
            </Box>
            {
                stock_status != "" && (
                    <Box>
                        <Typography>{stock_status}</Typography>
                    </Box>
                )
            }

            <FormProvider {...methods}>
            <form onSubmit={handleSubmit(handle_submit)}>
            
            {
                (stock_status == '' || stock_status == 'On backorder') && (
                    <Box>
                        <ProductAddQuantity single={data.sold_individually}/>
                    </Box>
                )
            }

            {
                can_purchase && (
                    <Box>
                        <Button type='submit' variant='contained'>
                            Add to basket
                        </Button>
                    </Box>
                )
            }
            </form>
            </FormProvider>


            
        </div>
    )
}

export default ProductSingleSimple
