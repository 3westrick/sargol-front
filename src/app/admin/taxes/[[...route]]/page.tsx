import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import React from 'react'
import TaxList from './TaxList'
import { getRates, getTax, getTaxes } from '@/api/admin/taxApi'
import TaxPage from './TaxPage'
import { getTaxesOptions } from '@/api/admin/optionApi'
import TaxRates from './TaxRates'

const page = async ({params}: {
    params: {route: any}
}) => {

    const queryClient = new QueryClient()

    if (params.route == undefined){
        await queryClient.prefetchQuery({
            queryKey: ['admin-taxes', {query: "", field: "", order: "", limit: 10, offset: 0}],
            queryFn: () => getTaxes("", "", "", 10, 0),
        })
        await queryClient.prefetchQuery({
            queryKey: ['admin-options-taxes', ],
            queryFn: () => getTaxesOptions()
        })
        return <HydrationBoundary state={dehydrate(queryClient)}>
            <TaxPage/>
        </HydrationBoundary>
    }

    if (params.route[0] != undefined){
        await queryClient.prefetchQuery({
            queryKey: ['admin-taxes', params.route[0]],
            queryFn: () => getTax(params.route[0])
        })

        // await queryClient.prefetchQuery({
        //     queryKey: ['admin-rates', params.route[0]],
        //     queryFn: () => getRates(params.route[0])
        // })

        return <HydrationBoundary state={dehydrate(queryClient)}>
            <TaxRates taxId={params.route[0]}/>
        </HydrationBoundary>
    }
}

export default page
