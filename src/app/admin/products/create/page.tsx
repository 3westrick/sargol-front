import { getAttributes } from '@/api/admin/attributes/attributeAPI'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import React from 'react'
import ProductCreate from './ProductCreate'
import { getCategoriesProduct } from '@/api/admin/categories/categoryAPI'

const ProductCreatePage = async () => {
  const queryClient = new QueryClient()
  await queryClient.fetchQuery({
      queryKey: ['admin-attributes'],
      queryFn: getAttributes,
  })
  await queryClient.fetchQuery({
      queryKey: ['admin-categories-product'],
      queryFn: getCategoriesProduct,
  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductCreate/>
    </HydrationBoundary>
  )
}

export default ProductCreatePage
