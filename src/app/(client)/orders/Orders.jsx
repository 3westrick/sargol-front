"use client"
import { getAtt, getOrders } from '@/api/client/orders/orderAPI'
import { get_page } from '@/utils/urls'
import { Button } from '@mui/material'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const Orders = () => {
    // const orders_query = useQuery({
    //     queryKey: ['orders', {query: "", field: "", order: "", limit: 10, offset: 0}],
    //     queryFn:() => getOrders("", "", "", 10, 0),
    // })
    // const {data: orders} = orders_query



    const pathname = usePathname();
    const router = useRouter()
    const searchParams = useSearchParams()    
  
    const search = searchParams.get('search') ?? '';
  
    const page = get_page(searchParams)
    
    const orders_query = useQuery({
        queryKey: ['orders', {page: page}],
        queryFn: () => getOrders(page),
    })
    
    console.log(orders_query.data)

    return (
        <div>
            <Button onClick={() => fetchNextPage()}>Load morder</Button>
        </div>
    )
}

export default Orders
