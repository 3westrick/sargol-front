import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { notFound } from 'next/navigation'
import React from 'react'
import WidgetList from './WidgetList'
import { getWidgets } from '@/api/admin/widgets/widgetAPI'
import { getAttributes } from '@/api/admin/attributes/attributeAPI'

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
            queryKey: ['admin-attributes', {query: "", field: "", order: "", limit: 10, offset: 0}],
            queryFn:() => getAttributes("", "", "", 10, 0),
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
