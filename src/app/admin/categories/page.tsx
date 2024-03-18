import { getCategories } from '@/api/admin/categories/categoryAPI'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import React from 'react'
import Categories from './Categories'

const CategoriesPage = async () => {
    const queryClient = new QueryClient()
    await queryClient.fetchQuery({
        queryKey: ['admin-categories'],
        queryFn: getCategories,
    })
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Categories/>
        </HydrationBoundary>
    )
}

export default CategoriesPage
