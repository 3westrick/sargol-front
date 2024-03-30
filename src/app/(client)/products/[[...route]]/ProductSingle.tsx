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

type FormValue = {
    quantity: number,
    product: number
}

const ProductSingle = ({slug}: {slug: string}) => {
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

    const single_product = data.variants.length == 0
    const single_variant = single_product ? true : (variants.length == 1)
    const selected_all_att = attributes.length == param_queries.length
    const can_purchase = single_product || (single_variant && selected_all_att)
    const selected_none = param_queries.length == 0
    const detected_none = (param_queries.length > 0 && variants.length == 0)
    
    const gallery = []
    let price = ""

    if (single_product){
        gallery.push(data.image)
        data.gallery.map((image: any) => gallery.push(image.image))
        price = data.regular_price
    }else{
        if (selected_none){
            gallery.push(data.image)
            data.gallery.map((image: any) => gallery.push(image.image))
            variants.map((variant: any) => {
                gallery.push(variant.image)
                variant.gallery.map((image: any) => gallery.push(image.image))
            })
        }else if (detected_none){
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
            price = `Price: Not Available`

        }else{
            variants.map((variant: any) => {
                gallery.push(variant.image)
                variant.gallery.map((image: any) => gallery.push(image.image))
            })

            if (variants.length == 1){
                price = `Price: ${variants[0].regular_price}`
            }else{
                let max_price = 0
                let min_price = 0
                variants.map((variant: any) => {
                    max_price = max_price > variant.regular_price ? max_price : variant.regular_price
                    min_price = min_price < -variant.regular_price ? min_price : variant.regular_price
                })
                price = `Price: ${min_price} - ${max_price}`
            }

        }
    }

    const add_to_basket = useMutation({
        mutationFn: (data:FormValue) => createItem(data),
        onSuccess: (res) => {
            console.log("added to basket")
        }
    })

    function handle_submit(formData:FormValue){
        if (can_purchase){
            if(single_product){
                formData.product = data.id
            }else{
                formData.product = variants[0].id
            }
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
                            const data = e.target.value
                            const params = new URLSearchParams(searchParams);
                            if (data != '') {
                                params.set(attribute.slug, data);
                            } else {
                                params.delete(attribute.slug);
                            }
                            router.replace(`${pathname}?${params.toString()}`);
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
                {price}
            </Box>

            <FormProvider {...methods}>
            <form onSubmit={handleSubmit(handle_submit)}>
            <Box>
                <ProductAddQuantity/>
            </Box>

            <Box>
                <Button type='submit' variant='contained' disabled={!can_purchase}>
                    Purchase
                </Button>
            </Box>
            </form>
            </FormProvider>


            
        </div>
    )
}

export default ProductSingle
