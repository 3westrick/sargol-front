"use client"
import { getCategories } from '@/api/client/categories/categoryAPI'
import { Box, Button, Pagination, Paper, Stack, TextField, Typography, debounce } from '@mui/material'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { InView, useInView } from 'react-intersection-observer';
import CircularProgress from '@mui/material/CircularProgress';
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { get_page, url_query } from '@/utils/urls'

const Categories = () => {

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
        queryKey: ['categories', search, page],
        queryFn: () => getCategories(page, search),
    })

    // useEffect(() => {
    //     console.log(11)
    //   }, [])

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
                    data.results.map(category => {
                        return (
                            <Box key={category.slug} mt={3}>
                                <Link href={`/product-category/${category.slug}`} style={{color:'unset', textDecoration: 'unset'}}>
                                <Paper>
                                    <Box p={2} >
                                        {category.title}  {typeof category.image == 'string' && <Box component={'img'} width={'auto'} height={100} src={category.image} />}
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

export default Categories
