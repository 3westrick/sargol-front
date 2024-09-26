import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import React from 'react'
import Checkout from './Checkout'
import { getProfile } from '@/api/client/account/accountApi'
import { getGeneralOptions } from '@/api/client/optionApi'
import { getBasket } from '@/api/client/orders/orderAPI'

const CheckoutPage = async () => {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ['profile'],
        queryFn: () => getProfile()
    })
    await queryClient.prefetchQuery({
        queryKey: ['general-options'],
        queryFn: () => getGeneralOptions()
    })
    await queryClient.prefetchQuery({
        queryKey: ['basket'],
        queryFn: () => getBasket()
    })
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Checkout/>
        </HydrationBoundary>
    )
}

export default CheckoutPage
