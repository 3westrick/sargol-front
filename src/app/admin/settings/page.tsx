import React from 'react'
import Settings from './Settings'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getGeneralOptions } from '@/api/admin/optionApi'

const page = async () => {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ['admin-options-general', ],
        queryFn: () => getGeneralOptions(),
    })
    return <HydrationBoundary state={dehydrate(queryClient)}>
        <Settings/>
    </HydrationBoundary>
}

export default page
