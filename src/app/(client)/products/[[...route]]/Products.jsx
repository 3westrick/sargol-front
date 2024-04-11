"use client"
import { getProducts } from '@/api/client/products/productAPI'
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import Product from './Product'
import { Box, CircularProgress, Grid, TextField } from '@mui/material'
import { InView } from 'react-intersection-observer';
import { getAttributes } from '@/api/client/attributes/attributeAPI'
import { debounce} from '@mui/material/utils'
import CustomSkelton from '@/components/CustomSkelton'

const Products = () => {
  const [search, setSearch] = useState("")
  const [field, setField] = useState("")
  const [order, setOrder] = useState("")
  const [filter, setFilter] = useState([])


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
      isLoading,
      isFetched,
      status,
  } = useInfiniteQuery({
      queryKey: ['products', {search , field, order}],
      queryFn: ({pageParam}) => getProducts(search, pageParam, field, order, {} ),
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) => lastPage.next,
      getPreviousPageParam: (previousPage, pages)=> previousPage.previous,
  })

  
  return (
    <Box>
      <Box>
        <TextField onChange={debounce(e => {
                setSearch(e.target.value)
            },500)}
        />
      </Box>
        {
          !isLoading && <>
          <Box>
            <Grid container>
                  {
                    data.pages.map((page) => page.results.map((product) => {
                      return <Grid item key={product.id} xs={4}>
                        <Product product={product} />
                      </Grid>
                    }))
                  }
            </Grid>
          </Box>

            {isFetchingNextPage && (
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            )}

            <InView onChange={(inView, entry) => {
              if (inView && status == 'success' && !isFetching  && hasNextPage){
                fetchNextPage()
              }
            } }/>
              
            </>
        }
      <Box>
        
      </Box>
      
    </Box>
  )
}

export default Products
