import { getItems } from '@/api/client/orders/orderAPI'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import React from 'react'
import CartList from './CartList'

const CartPage = async () => {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['items'],
        queryFn:() => getItems()
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <CartList/>
        </HydrationBoundary>
    )
    
}

export default CartPage
