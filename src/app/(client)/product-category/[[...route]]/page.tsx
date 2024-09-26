import { getCategory } from '@/api/client/categories/categoryAPI'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { notFound, redirect } from 'next/navigation'
import React from 'react'
import Category from './Category'

const ProductCategory = async ({params}: {
    params:{
        route: any
    }
  }) => {

    const queryClient = new QueryClient()

    if (!params.route){
        redirect('/categories')
    }
    
    if (params.route.length == 1){
        await queryClient.prefetchQuery({
            queryKey: ['categories', params.route[0] ,'', 1],
            queryFn: () => getCategory(params.route[0], 1 ,''),
        })
        return <HydrationBoundary state={dehydrate(queryClient)}>
                  <Category categorySlug={params.route[0]}/>
              </HydrationBoundary>
    }

    notFound()
}

export default ProductCategory
