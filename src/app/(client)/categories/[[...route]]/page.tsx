import { getCategories, getCategory } from '@/api/client/categories/categoryAPI'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import React from 'react'
import Categories from './Categories'
import { notFound } from 'next/navigation'
import Category from './Category'

const page = async ({params}: {
    params:{
        route: any
    }
  }) => {
    const queryClient = new QueryClient()
    if (!params.route){
        await queryClient.prefetchInfiniteQuery({
            queryKey: ['categories', ''],
            queryFn: ({pageParam}) => getCategories(pageParam, ''),
            initialPageParam: 1,
            getNextPageParam: (lastPage, pages) => {
                return lastPage.next
            },
            pages: 1, // prefetch the first 3 pages
        })

        return <HydrationBoundary state={dehydrate(queryClient)}>
                <Categories/>
            </HydrationBoundary>
    }

    if (params.route.length == 1){
        await queryClient.prefetchInfiniteQuery({
            queryKey: ['categories', params.route[0] ,''],
            queryFn: ({pageParam}) => getCategory(params.route[0], pageParam ,''),
            initialPageParam: 1,
            getNextPageParam: (lastPage, pages) => {
                return lastPage.next
            },
            pages: 1, // prefetch the first 3 pages
        })
        return <HydrationBoundary state={dehydrate(queryClient)}>
                  <Category categorySlug={params.route[0]}/>
              </HydrationBoundary>
      }

    notFound();
}

export default page
