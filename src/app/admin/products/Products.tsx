"use client"
import { getProducts } from '@/api/admin/products/productAPI'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'

type ProductProp ={
    id: number,
    title: string,
    slug: string,
    description: string,
    short_description: string,
    price: number,
    quantity: number,

    parent: any,
    category: any,
    attributes: any,
    values: any,
}

const Products = () => {
    const products = useQuery({
        queryKey: ['admin-products'],
        queryFn: () => getProducts()
    })
    
    return (
        <div>
        <Link href={'/admin/products/create'}>Create Product</Link>
        </div>
    )
}

export default Products
