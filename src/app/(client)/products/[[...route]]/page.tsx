import { getAttribute, getAttributes } from '@/api/admin/attributes/attributeAPI'
import { getCategoriesProduct } from '@/api/admin/categories/categoryAPI'
import { getProductWithId, getProductWithSlug, getProducts } from '@/api/client/products/productAPI'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { notFound } from 'next/navigation'
import React from 'react'
import { auth } from '@/lib/auth'
import Products from './Products'
import ProductSingle from './ProductSingle'
import { getWidget } from '@/api/client/widgets/widgetAPI'

const AttributePage = async ({params}: {
    params:{
        route: [string, number] | [string]
    }
}) => {
    const queryClient = new QueryClient()


    if (params.route == undefined) {
        // products/?search=a&limit=10&offset=0&ordering=id&shipping_class=a&sold_individually=true&stock_management=true&stock_status=a&tax_class=a&tax_status=a&unit__icontains=a
        await queryClient.prefetchQuery({
            queryKey: ['products', {search: "", queries: {values:'', categories:'', price_gte:'', price_lte:'', rating_gte:''}}, 1],
            queryFn: () => getProducts("", 1, {values:'', categories:'', price_gte:'', price_lte:'', rating_gte:''} ),
        })

        await queryClient.prefetchQuery({
            queryKey: ['widgets', 'shop_page_widget_area'],
            queryFn: () => getWidget('shop_page_widget_area')
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
