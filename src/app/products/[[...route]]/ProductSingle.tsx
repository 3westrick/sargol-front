"use client"
import { getProductWithSlug } from '@/api/client/products/productAPI'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'

const ProductSingle = ({slug}: {slug: string}) => {
    const product = useQuery({
        queryKey: ['products', slug],
        queryFn:() => getProductWithSlug(slug)
    })


    const pathname = usePathname();
    const router = useRouter()
    const searchParams = useSearchParams()    

    const {data, isFetched, } = product

    const value_ids = data.values.map((item: any) => item.id)

    const attributes = structuredClone(data.attributes).filter((attribute: any) => attribute.variant).map((attribute: any) => {
        const values = attribute.attribute.values.filter((value: any) => value_ids.includes(value.id))
        return {...attribute.attribute, values, visible: attribute.visible}
    })

    const param_queries = attributes.filter((attribute: any) => searchParams.get(attribute.slug)).map((attribute: any) => ({attribute: attribute.slug, value: searchParams.get(attribute.slug)}))

    // const variants: any[] = []
    
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
    
    const gallery = []

    if (single_product){
        gallery.push(data.image)
        data.gallery.map((image: any) => gallery.push(image.image))
    }else{
        if(selected_none){
            gallery.push(data.image)
            data.gallery.map((image: any) => gallery.push(image.image))
            variants.map((variant: any) => {
                gallery.push(variant.image)
                variant.gallery.map((image: any) => gallery.push(image.image))
            })
        }else{
            variants.map((variant: any) => {
                gallery.push(variant.image)
                variant.gallery.map((image: any) => gallery.push(image.image))
            })
        }
    }

    console.log(gallery)

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
                <Button variant='contained' disabled={!can_purchase}>
                    Purchase
                </Button>
            </Box>


            
        </div>
    )
}

export default ProductSingle
