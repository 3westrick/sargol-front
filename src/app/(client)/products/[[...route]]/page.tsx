import { getAttribute, getAttributes } from '@/api/admin/attributes/attributeAPI'
import { getCategoriesProduct } from '@/api/admin/categories/categoryAPI'
import { getProductWithId, getProductWithSlug, getProducts } from '@/api/client/products/productAPI'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { notFound } from 'next/navigation'
import React from 'react'
import { auth } from '@/lib/auth'
import Products from './Products'
import ProductSingle from './ProductSingle'

const AttributePage = async ({params}: {
    params:{
        route: [string, number] | [string]
    }
}) => {
    const queryClient = new QueryClient()

    // await queryClient.prefetchQuery({
    //     queryKey: ['admin-attributes', {query: "", field: "", order: "", limit: 10, offset: 0}],
    //     queryFn:() => getAttributes("", "", "", 10, 0),
    // })
    // await queryClient.prefetchQuery({
    //     queryKey: ['admin-categories-product'],
    //     queryFn: getCategoriesProduct,
    // })
    
    // if (params.route?.length == 2 && params.route[0].toLowerCase() == 'edit') {
    //     await queryClient.prefetchQuery({
    //         queryKey: ['admin-product', params.route[1]],
    //         queryFn: () => getProductWithId(params.route[1]),
    //     })
    //     return (
    //         <HydrationBoundary state={dehydrate(queryClient)}>
    //             <ProductEdit productID={params.route[1]}/>
    //         </HydrationBoundary>
    //       )
    // }else


    if (params.route == undefined) {
        // products/?search=a&limit=10&offset=0&ordering=id&shipping_class=a&sold_individually=true&stock_management=true&stock_status=a&tax_class=a&tax_status=a&unit__icontains=a
        await queryClient.prefetchQuery({
            queryKey: ['products', {query: "", limit: 10, offset: 0, field: "", order:""}],
            queryFn: () => getProducts("", "", "" , 10, 0, ),
        })

        return (
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Products/>
            </HydrationBoundary>
        )
    }

    if (params.route.length == 1) {
        await queryClient.prefetchQuery({
            queryKey: ['products', params.route[0]],
            queryFn: () => getProductWithSlug(params.route[0]),
        })
        return (
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ProductSingle slug={params.route[0]}/>
            </HydrationBoundary>
          )
    }


    notFound();
    
}

export default AttributePage
