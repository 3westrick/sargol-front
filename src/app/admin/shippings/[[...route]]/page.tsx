import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import React from 'react'
import ShippingList from './ShippingList'
import { getRegions, getShippings, getZone, getZones } from '@/api/admin/shippingApi'
import Shipping from './Shipping'
import ShippingZoneCreate from './ShippingZoneCreate'
import ShippingZoneEdit from './ShippingZoneEdit'
import { getShippingOptions, getTaxesOptions } from '@/api/admin/optionApi'

const page = async ({params}: {
    params: {route: any}
}) => {

    const queryClient = new QueryClient()

    if (params.route == undefined){
        await queryClient.prefetchQuery({
            queryKey: ['admin-shippins', {query: "", field: "", order: "", limit: 10, offset: 0}],
            queryFn: () => getShippings("", "", "", 10, 0),
        })
        await queryClient.prefetchQuery({
            queryKey: ['admin-zones', ],
            queryFn: () => getZones()
        })

        await queryClient.prefetchQuery({
            queryKey: ['admin-options-shippings', ],
            queryFn: () => getShippingOptions()
        })

        return <HydrationBoundary state={dehydrate(queryClient)}>
            <Shipping/>
        </HydrationBoundary>
    }
    
    if (params.route[0] == 'zones' && params.route[1] == 'create'){
        
        await queryClient.prefetchQuery({
            queryKey: ['admin-shippins', {query: "", field: "", order: "", limit: 10, offset: 0}],
            queryFn: () => getShippings("", "", "", 10, 0),
        })

        await queryClient.prefetchQuery({
            queryKey: ['admin-regions', ],
            queryFn: () => getRegions()
        })

        return<HydrationBoundary state={dehydrate(queryClient)}>
            <ShippingZoneCreate/>
        </HydrationBoundary>
    }

    if (params.route[0] == 'zones' && params.route[1] == 'edit' && params.route[2] != undefined){
        await queryClient.prefetchQuery({
            queryKey: ['admin-shippins', {query: "", field: "", order: "", limit: 10, offset: 0}],
            queryFn: () => getShippings("", "", "", 10, 0),
        })

        await queryClient.prefetchQuery({
            queryKey: ['admin-regions', ],
            queryFn: () => getRegions()
        })

        await queryClient.prefetchQuery({
            queryKey: ['admin-zones', params.route[2]],
            queryFn: () => getZone(params.route[2])
        })
        
        return<HydrationBoundary state={dehydrate(queryClient)}>
        <ShippingZoneEdit zoneId={params.route[2]}/>
    </HydrationBoundary>

    }


    return <h1>aa</h1>

    
}

export default page
