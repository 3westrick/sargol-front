import { Box, Grid, Skeleton } from '@mui/material'
import React from 'react'

const CustomSkelton = ({rows, cols, height}: {rows: number, cols: number, height: number}) => {
    const skeletons = []
    const r = [...new Array(rows)]
    const c = [...new Array(cols)]
    return (
        <Box>
            {r.map((_, index) => (
                <Box key={index} display={'flex'} columnGap={3} height={height}>
                    {c.map((_, index) => <Skeleton key={index} width={'100%'} height={height}/>)}
                </Box>
            ))}
        </Box>
    )
}

export default CustomSkelton
