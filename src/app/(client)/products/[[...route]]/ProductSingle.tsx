"use client"
import { getProductWithSlug } from '@/api/client/products/productAPI'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import ProductSingleSimple from './ProductSingleSimple'
import ProductSingleVariation from './ProductSingleVariation'
import { notFound } from 'next/navigation'

const ProductSingle = ({slug}: {slug: string}) => {
    const product = useQuery({
        queryKey: ['products', slug],
        queryFn:() => getProductWithSlug(slug)
    })

    if (product.data.type == 'simple') return <ProductSingleSimple slug={slug}/>
    if (product.data.type == 'variation') return <ProductSingleVariation slug={slug}/>

    notFound()
}

export default ProductSingle
