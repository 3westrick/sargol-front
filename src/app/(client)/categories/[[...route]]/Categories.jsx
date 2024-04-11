"use client"
import { getCategories } from '@/api/client/categories/categoryAPI'
import { Box, Button, Paper, TextField } from '@mui/material'
import { useInfiniteQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer';
import CircularProgress from '@mui/material/CircularProgress';
import Link from 'next/link'

const Categories = () => {
    const [search, setSearch] = useState('')
    const { ref, inView, entry } = useInView({
        /* Optional options */
        threshold: 0,
        // rootMargin: "0px 0px 20px 0px" //  (top, right, bottom, left).
    });

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
        status,
    } = useInfiniteQuery({
        queryKey: ['categories', search],
        queryFn: ({pageParam}) => getCategories(pageParam, search),
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => lastPage.next,
        getPreviousPageParam: (previousPage, pages)=> previousPage.previous,
    })

    useEffect(() => {
        if (inView && status == 'success' && !isFetching  && hasNextPage){
            fetchNextPage()
        }
    }, [inView, status, hasNextPage,isFetching])

    // console.log(isLoading)
    
    return (
        <Box>
            <Box>
                <TextField value={search} onChange={(e) => setSearch(e.target.value)}/>
            </Box>
            {!isLoading && <>
            <Box>
                {
                    data.pages.map(page => page.results.map(category => {
                        return (
                            <Box key={category.slug} mt={3}>
                                <Link href={`/categories/${category.slug}`} style={{color:'unset', textDecoration: 'unset'}}>
                                <Paper>
                                    <Box p={2} >
                                        {category.title}  {typeof category.image == 'string' && <Box component={'img'} width={'auto'} height={100} src={category.image} />}
                                    </Box>
                                </Paper>
                                </Link>
                            </Box>
                        )
                    }))
                }
            </Box>
            {isFetchingNextPage && (
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            )}
            <Box mt={5} ref={ref}></Box>
            </>
            }

        </Box>
    )
}

export default Categories
