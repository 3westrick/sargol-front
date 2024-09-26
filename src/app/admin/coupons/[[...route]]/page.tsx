import { getCategories } from '@/api/admin/categories/categoryAPI'
import { getProducts, getProductsCoupon } from '@/api/admin/products/productAPI'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { notFound } from 'next/navigation'
import React from 'react'
import CouponCreate from './CouponCreate'
import CouponEdit from './CouponEdit'
import { getCoupon, getCoupons } from '@/api/admin/coupons/couponAPI'
import Coupons from './Coupons'
import { getUsers } from '@/api/admin/users/userAPI'

const CouponPage = async ({params}: {
  params:{
      route: any
  }
}) => {
  
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['admin-products', {query: "", limit: 10, offset: 0, field: "", order:""}],
    queryFn: () => getProductsCoupon("", "", "" , 10, 0,),
  })

  await queryClient.prefetchQuery({
      queryKey: ['admin-categories', {query: "", field: "", order: "", limit: 10, offset: 0}],
      queryFn:() => getCategories("", "", "", 10, 0),
  })

  await queryClient.prefetchQuery({
    queryKey: ['admin-users', {query: "", field: "", order: "", limit: 10, offset: 0}],
    queryFn:() => getUsers("", "", "", 10, 0),
  })

  if (!params.route){
    await queryClient.prefetchQuery({
      queryKey: ['admin-coupons', {query: "", field: "", order: "", limit: 10, offset: 0}],
      queryFn:() => getCoupons("", "", "", 10, 0),
    })
    return <HydrationBoundary state={dehydrate(queryClient)}>
              <Coupons/>
          </HydrationBoundary>
  }
  if (params.route.length == 1 && params.route[0].toLowerCase() == 'create'){
    return <HydrationBoundary state={dehydrate(queryClient)}>
              <CouponCreate/>
          </HydrationBoundary>
  }
  if (params.route.length == 2 && params.route[0].toLowerCase() == 'edit'){
    await queryClient.prefetchQuery({
      queryKey: ['admin-coupons', params.route[1]],
      queryFn: () => getCoupon(params.route[1]),
    })
    return <HydrationBoundary state={dehydrate(queryClient)}>
              <CouponEdit couponId={params.route[1]}/>
          </HydrationBoundary>
  }

  notFound();
}

export default CouponPage
