import { getCategories, getCategory } from '@/api/client/categories/categoryAPI'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import React from 'react'
import Categories from './Categories'
import { notFound } from 'next/navigation'

const page = async ({params}: {
    params:{
        route: any
    }
  }) => {
    const queryClient = new QueryClient()
    if (!params.route){
        await queryClient.prefetchQuery({
            queryKey: ['categories', '', 1],
            queryFn: () => getCategories(1, ''),
        })

        return <HydrationBoundary state={dehydrate(queryClient)}>
                <Categories/>
            </HydrationBoundary>
    }


    notFound();
}

export default page
