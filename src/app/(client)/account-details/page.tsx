import { getProfile } from '@/api/client/account/accountApi'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import React from 'react'
import AccountDetail from './AccountDetail'

const AccountDetailPage = async () => {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ['profile'],
        queryFn: () => getProfile()
    })
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <AccountDetail/>
        </HydrationBoundary>
    )
}

export default AccountDetailPage
