import { getAttribute, getAttributes } from '@/api/admin/attributes/attributeAPI'
import { getCategoriesProduct } from '@/api/admin/categories/categoryAPI'
import { getProductWithId, getProducts } from '@/api/admin/products/productAPI'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { notFound } from 'next/navigation'
import React from 'react'
import ProductEdit from './components/ProductEdit'
import ProductCreate from './components/ProductCreate'
import { auth } from '@/lib/auth'
import Products from './Products'
import { getAllShippings, getShippings } from '@/api/admin/shippingApi'
import { getAllTaxes, getTaxes } from '@/api/admin/taxApi'

const AttributePage = async ({params}: {
    params:{
        route: [string, number]
    }
}) => {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['admin-attributes', {query: "", field: "", order: "", limit: 10, offset: 0}],
        queryFn:() => getAttributes("", "", "", 10, 0),
    })
    await queryClient.prefetchQuery({
        queryKey: ['admin-shippings'],
        queryFn:() => getAllShippings(),
    })
    await queryClient.prefetchQuery({
        queryKey: ['admin-taxes'],
        queryFn:() => getAllTaxes(),
    })
    await queryClient.prefetchQuery({
        queryKey: ['admin-categories-product'],
        queryFn: getCategoriesProduct,
    })
    
    if (params.route?.length == 2 && params.route[0].toLowerCase() == 'edit') {
        await queryClient.prefetchQuery({
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
        return (
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ProductCreate/>
            </HydrationBoundary>
          )
    }

    if (params.route == undefined) {
        // products/?search=a&limit=10&offset=0&ordering=id&shipping_class=a&sold_individually=true&stock_management=true&stock_status=a&tax_class=a&tax_status=a&unit__icontains=a
        await queryClient.prefetchQuery({
            // queryKey: ['admin-products', {query: "", limit: 10, offset: 0, field: "", order:"", shipping_class: '', sold_individually: 'unknown', stock_management: 'unknown', stock_status: '', tax_class: '', tax_status: '', unit__icontains: ''}],
            queryKey: ['admin-products', {query: "", limit: 10, offset: 0, field: "", order:""}],
            queryFn: () => getProducts("", "", "" , 10, 0),
        })

        return (
        <HydrationBoundary state={dehydrate(queryClient)}>
        <Products/>
        </HydrationBoundary>
        )
    }

    notFound();
    
}

export default AttributePage
