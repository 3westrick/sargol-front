"use client"
import { getCategory } from '@/api/client/categories/categoryAPI';
import { Box, Pagination, Paper, Stack, TextField, Typography, debounce } from '@mui/material';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { InView, useInView } from 'react-intersection-observer';
import CircularProgress from '@mui/material/CircularProgress';
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { get_page, url_query } from '@/utils/urls';

const Category = ({categorySlug}) => {
    

  const pathname = usePathname();
  const router = useRouter()
  const searchParams = useSearchParams()    

  const search = searchParams.get('search') ?? '';
  

  const page = get_page(searchParams);

  const handleChange = (event, value ) => {
      url_query(value.toString(), 'page',pathname, router, searchParams, false)
  };
  


  const {
      data, // {lastPage, pages}
      isFetching,
      isLoading,
      status,
  } = useQuery({
      queryKey: ['categories',categorySlug,  search, page],
      queryFn: () => getCategory(categorySlug, page ,search),
  })



  return (
    <Box>            
      <Box>
          <TextField defaultValue={search} onChange={debounce(e => {
                    if (search == ''){
                        url_query([e.target.value, ''], ['search', 'page'],pathname, router, searchParams, false);
                    }else{
                        url_query([e.target.value, ''], ['search', 'page'],pathname, router, searchParams, true);
                    }
                },500)}/>
      </Box>

      {!isLoading && <>
            <Box>
                {
                    data.results.map(product => {
                        return (
                            <Box key={product.slug} mt={3}>
                                <Link href={`/products/${product.slug}`} style={{color:'unset', textDecoration: 'unset'}}>
                                <Paper>
                                    <Box p={2} >
                                        {product.title}
                                    </Box>
                                </Paper>
                                </Link>
                            </Box>
                        )
                    })
                }
            </Box>

            <Box>
              <Stack spacing={2}>
                <Typography>Page: {page}</Typography>
                <Pagination 
                count={Math.ceil(data.count / 2)} 
                page={page} 
                onChange={handleChange}
                />
              </Stack>
            </Box>

            </>
            }

      
    </Box>
  )
}

export default Category
