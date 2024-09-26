import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { notFound } from 'next/navigation'
import React from 'react'
import Orders from './Orders'
import OrderSingle from './OrderSingle'
import { getOrder, getOrders } from '@/api/admin/orders/orderAPI'

const CouponPage = async ({params}: {
  params:{
      route: any
  }
}) => {
  
  const queryClient = new QueryClient()

  if (!params.route){
    await queryClient.prefetchQuery({
      queryKey: ['admin-orders', {query: "", field: "", order: "", limit: 10, offset: 0, status: ''}],
      queryFn:() => getOrders("", "", "", 10, 0, ''),
    })
    return <HydrationBoundary state={dehydrate(queryClient)}>
              <Orders/>
          </HydrationBoundary>
  }
  if (params.route.length == 1 ){
    await queryClient.prefetchQuery({
      queryKey: ['admin-orders', params.route[0]],
      queryFn:() => getOrder(params.route[0]),
    })
    return <HydrationBoundary state={dehydrate(queryClient)}>
              <OrderSingle orderId={params.route[0]}/>
          </HydrationBoundary>
  }

  notFound();
}

export default CouponPage
