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
import {v4} from 'uuid'

type FormValue = {
    quantity: number,
    product: number
}

const ProductSingleVariation = ({slug}: {slug: string}) => {
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


    const pathname = usePathname();
    const router = useRouter()
    const searchParams = useSearchParams()    

    const {data, } = product

    const value_ids = data.values.map((item: any) => item.id)

    const attributes = structuredClone(data.attributes).filter((attribute: any) => attribute.variant).map((attribute: any) => {
        const values = attribute.attribute.values.filter((value: any) => value_ids.includes(value.id))
        return {...attribute.attribute, values, visible: attribute.visible}
    })

    const param_queries = attributes.filter((attribute: any) => searchParams.get(attribute.slug)).map((attribute: any) => ({attribute: attribute.slug, value: searchParams.get(attribute.slug)}))

    
    const variants = data.variants.filter((variant: any) => {
        let found_all = true
        for(let i = 0 ; i < param_queries.length ; i++){
            let found = false;
            for(let j = 0; j < variant.values.length; j++){
                if (param_queries[i].value == variant.values[j].slug){
                    found = true;
                    break
                }
            }
            if(!found){
                found_all = false;
                break
            }
        }
        if (found_all) return variant
    })
    
    const single_variant = variants.length == 1
    const selected_all_att = attributes.length == param_queries.length
    let can_purchase = single_variant && selected_all_att
    const selected_none = param_queries.length == 0
    const detected_none = (param_queries.length > 0 && variants.length == 0)
    
    const gallery = []
    let price = ""
    let sale_price = ""
    let stock_status = ""

    
    

    if (selected_none){
        // no attribbute is selected
        let max_price = 0
        let min_price = 0
        gallery.push(data.image)
        data.gallery.map((image: any) => gallery.push(image.image))
        variants.map((variant: any) => {
            gallery.push(variant.image)
            variant.gallery.map((image: any) => gallery.push(image.image))
            max_price = max_price > variant.regular_price ? max_price : variant.regular_price
            min_price = min_price < -variant.regular_price ? min_price : variant.regular_price
        })
        price = `${min_price} - ${max_price}`
    }else if (detected_none){
        // selected some attributes but there is no match
        gallery.push(data.image)
        data.gallery.map((image: any) => gallery.push(image.image))
        let max_price = 0
        let min_price = 0
        data.variants.map((variant: any) => {
            gallery.push(variant.image)
            variant.gallery.map((image: any) => gallery.push(image.image))
            max_price = max_price > variant.regular_price ? max_price : variant.regular_price
            min_price = min_price < -variant.regular_price ? min_price : variant.regular_price
        })
        price = `Not Available`

    }else{

        // found matching variant(s)

        variants.map((variant: any) => {
            gallery.push(variant.image)
            variant.gallery.map((image: any) => gallery.push(image.image))
        })

        // if found the only one that matches
        if (variants.length == 1){
            price = variants[0].regular_price
            sale_price = variants[0].sale_price
            
            if(data.stock_management){
                if (data.quantity == 0){
                    if(data.backorder == 'not_allow'){
                        stock_status = "Out of stock"
                        can_purchase = false
                    }else if (data.backorder == 'notify'){
                        stock_status = "On backorder"
                    }else if (data.backorder == 'allow'){

                    }
                }
            }else{
                console.log(variants[0])
                if (variants[0].quantity == 0){
                    stock_status = "Out of stock"
                    can_purchase = false
                }
            }

    
        }else{
            // if found a list of matching variants
            let max_price = 0
            let min_price = 0
            variants.map((variant: any) => {
                max_price = max_price > variant.regular_price ? max_price : variant.regular_price
                min_price = min_price < -variant.regular_price ? min_price : variant.regular_price
            })
            price = `${min_price} - ${max_price}`
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
            formData.product = variants[0].id
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
                {attributes.map((attribute: any) => {
                    return (
                        <select key={attribute.id} value={searchParams.get(attribute.slug) ?? ''} onChange={(e) => {
                            url_query(e.target.value, attribute.slug, pathname, router, searchParams)
                        }}>
                            <option value='' >Any</option>
                            
                            {attribute.values.map((value: any) => {
                                return (
                                    <option key={value.id} value={value.slug}>{value.title}</option>
                                )
                            })}
                        </select>
                    )
                })}
            </Box>

            <Box>
                {(parseInt(sale_price) == 0 || sale_price == '') ? <Typography>Price: {price}</Typography> : (
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
                    <>
                    <Box>
                        <ProductAddQuantity single={data.sold_individually}/>
                    </Box>
                    <Box>
                        <Button type='submit' variant='contained' disabled={!can_purchase}>
                            Add to basket
                        </Button>
                    </Box>
                    </>
                )
            }

            </form>
            </FormProvider>


            
        </div>
    )
}

export default ProductSingleVariation
