import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import React from 'react'
import Products from './Products'
import { getProducts } from '@/api/admin/products/productAPI'

const ProductsPage = async () => {
  const queryClient = new QueryClient()
  await queryClient.fetchQuery({
      queryKey: ['admin-products'],
      queryFn: getProducts,
  })
  return (
      <HydrationBoundary state={dehydrate(queryClient)}>
          <Products/>
      </HydrationBoundary>
  )
}

export default ProductsPage
