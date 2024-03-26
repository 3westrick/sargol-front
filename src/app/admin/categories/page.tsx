import { getCategories } from '@/api/admin/categories/categoryAPI'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import React from 'react'
import Categories from './Categories'
import TestCategories from './TestCategories'

const CategoriesPage = async () => {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ['admin-categories', {query: "", field: "", order: "", limit: 10, offset: 0}],
        queryFn: (data: any) => getCategories("", "", "", 10, 0),
    })
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Categories/>
        </HydrationBoundary>
    )
}

export default CategoriesPage
