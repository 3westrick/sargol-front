"use client"
import { getAtt, getOrders } from '@/api/client/orders/orderAPI'
import { Button } from '@mui/material'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import React from 'react'

const Orders = () => {
    // const orders_query = useQuery({
    //     queryKey: ['orders', {query: "", field: "", order: "", limit: 10, offset: 0}],
    //     queryFn:() => getOrders("", "", "", 10, 0),
    // })
    // const {data: orders} = orders_query

    const {
        data, // {lastPage, pages}
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
        isFetchingNextPage,
        isFetchingPreviousPage,
        error,
        isFetching,
        status,

    } = useInfiniteQuery({
        queryKey: ['orders'],
        queryFn: ({pageParam}) => getOrders(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => lastPage.next,
        getPreviousPageParam: (previousPage, pages)=> previousPage.previous,
    })

    
    console.log(data.pages)
    

    return (
        <div>
            <Button onClick={() => fetchNextPage()}>Load morder</Button>
        </div>
    )
}

export default Orders
