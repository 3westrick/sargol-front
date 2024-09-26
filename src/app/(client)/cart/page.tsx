import { getItems } from '@/api/client/orders/orderAPI'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import React from 'react'
import CartList from './CartList'
import { getGeneralOptions } from '@/api/client/optionApi'

const CartPage = async () => {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['items'],
        queryFn:() => getItems()
    })

    await queryClient.prefetchQuery({
        queryKey: ['general-options'],
        queryFn: () => getGeneralOptions()
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <CartList/>
        </HydrationBoundary>
    )
    
}

export default CartPage
