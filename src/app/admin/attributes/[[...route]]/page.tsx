import { getAttribute, getAttributes, getValues } from '@/api/admin/attributes/attributeAPI'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { notFound } from 'next/navigation'
import React from 'react'
import Attribute from './Attribute'
import Attributes from './Attributes'

const AttributePage = async ({params}: {
    params:{
        route: [number, string]
    }
}) => {
    const queryClient = new QueryClient()

    if (params.route?.length == 2 && params.route[1].toLowerCase() == 'values') {
        await queryClient.prefetchQuery({
            queryKey: ['admin-attributes', {attributeID: params.route[0]}],
            queryFn: () => getAttribute(params.route[0]),
        })
        await queryClient.prefetchQuery({
            queryKey: ['admin-values', {attributeID: params.route[0], query: '', field: '', order: '', limit: 10, offset: 0}],
            queryFn: () => getValues(params.route[0], "", "", "", 10, 0),
        })

        return (
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Attribute attributeID={params.route[0]}/>
            </HydrationBoundary>
          )
    }

    if (params.route == undefined) {

        await queryClient.prefetchQuery({
            queryKey: ['admin-attributes', {query: "", field: "", order: "", limit: 10, offset: 0}],
            queryFn:() => getAttributes("", "", "", 10, 0),
        })

        return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Attributes/>
        </HydrationBoundary>
        )
    }

    notFound();
    
}

export default AttributePage
