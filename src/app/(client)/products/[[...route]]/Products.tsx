"use client"
import { getProducts } from '@/api/client/products/productAPI'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import Product from './Product'
import { Box, Grid } from '@mui/material'

const Products = () => {

  const products = useQuery({
    queryKey: ['products', {query: "", limit: 10, offset: 0, field: "", order:""}],
    queryFn: () => getProducts("", "", "" , 10, 0, )
  })

  const { data, isFetched, isLoading } = products
  
  return (
    <Box>
      <Grid container>
        {
          isFetched && 
            data.results.map((item: any) => (
              <Grid item key={item.id} xs={3}>
                <Product product={item} />
              </Grid>
            ))
        }
      </Grid>
      
    </Box>
  )
}

export default Products
