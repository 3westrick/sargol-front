import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { notFound } from 'next/navigation'
import React from 'react'
import WidgetList from './WidgetList'
import { getWidgets } from '@/api/admin/widgets/widgetAPI'
import { getAllAttributes, getAttributes } from '@/api/admin/attributes/attributeAPI'

const page = async ({params}: {params: {
    route: any
}}) => {
    const queryClient = new QueryClient()

    if (params.route == undefined){
        await queryClient.prefetchQuery({
            queryKey: ['admin-widgets'],
            queryFn:() => getWidgets(),
        })

        await queryClient.prefetchQuery({
            queryKey: ['admin-attributes', 'all'],
            queryFn:() => getAllAttributes(),
        })

        return (
            <HydrationBoundary state={dehydrate(queryClient)}>
                <WidgetList/>
            </HydrationBoundary>
        )
    }
    notFound();
}

export default page
