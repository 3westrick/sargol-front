import { getAttribute, getAttributes } from '@/api/admin/attributes/attributeAPI'
import { getCategoriesProduct } from '@/api/admin/categories/categoryAPI'
import { getProductWithId, getProducts } from '@/api/admin/products/productAPI'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { notFound } from 'next/navigation'
import React from 'react'
import ProductEdit from './components/ProductEdit'
import ProductCreate from './components/ProductCreate'
import { auth } from '@/lib/auth'

const AttributePage = async ({params}: {
    params:{
        route: [string, number]
    }
}) => {
    const queryClient = new QueryClient()

    const session = await auth()

    await queryClient.fetchQuery({
        queryKey: ['admin-attributes'],
        queryFn: getAttributes,
    })
    await queryClient.fetchQuery({
        queryKey: ['admin-categories-product'],
        queryFn: getCategoriesProduct,
    })
    
    if (params.route?.length == 2 && params.route[0].toLowerCase() == 'edit') {
        await queryClient.fetchQuery({
            queryKey: ['admin-product', params.route[1]],
            queryFn: () => getProductWithId(params.route[1]),
        })
        return (
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ProductEdit productID={params.route[1]}/>
            </HydrationBoundary>
          )
    }else

    if (params.route && params.route[0].toLowerCase() == 'create') {
        // await queryClient.fetchQuery({
        //     queryKey: ['admin-products', params.route[1]],
        //     queryFn: () => getAttribute(params.route[1]),
        // })
        return (
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ProductCreate/>
            </HydrationBoundary>
          )
    }

    if (params.route == undefined) {

        await queryClient.fetchQuery({
            queryKey: ['admin-products'],
            queryFn: getProducts,
        })

        return (
        <HydrationBoundary state={dehydrate(queryClient)}>
        <p>Products List</p>
        </HydrationBoundary>
        )
    }

    notFound();
    
}

export default AttributePage
