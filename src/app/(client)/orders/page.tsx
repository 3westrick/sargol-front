import { getAtt, getOrders } from '@/api/client/orders/orderAPI'
import { Box } from '@mui/material'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import React from 'react'
import Orders from './Orders'

const OrdersPage = async () => {
    const queryClient = new QueryClient()

    // await queryClient.prefetchQuery({
    //     queryKey: ['orders', {query: "", field: "", order: "", limit: 10, offset: 0}],
    //     queryFn:() => getOrders("", "", "", 10, 0),
    // })

    await queryClient.prefetchInfiniteQuery({
        queryKey: ['orders'],
        queryFn: ({pageParam}) => getOrders(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => {
            return lastPage.next
        },
        pages: 1, // prefetch the first 3 pages
    })
    

    return <HydrationBoundary state={dehydrate(queryClient)}>
              <Orders/>
          </HydrationBoundary>
}

export default OrdersPage
