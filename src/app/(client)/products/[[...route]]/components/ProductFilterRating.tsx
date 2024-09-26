import { client_products_query } from '@/Atoms';
import { url_query } from '@/utils/urls';
import { Box, Rating, Typography } from '@mui/material';
import { useAtom } from 'jotai';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

const ProductFilterRating = ({widget}: {widget: any}) => {

    const pathname = usePathname();
    const router = useRouter()
    const searchParams = useSearchParams()

    const [queries, setQueries] = useAtom(client_products_query)
    const rating = queries.rating_gte == '' ? 0 : parseFloat(queries.rating_gte)
    
    return (
        <Box>
            <Typography component="legend">{widget.title}</Typography>
            <Rating
            name="simple-controlled"
            value={rating}
            precision={0.5}
            onChange={(event, newValue: number| null) => {
                setQueries({...queries, rating_gte: newValue == null ? '': newValue.toString()})
                url_query('', 'page',pathname, router, searchParams, false)
            }}
            />
        </Box>
    )
}

export default ProductFilterRating
