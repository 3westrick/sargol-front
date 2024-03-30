import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const Product = ({product}: {product: any}) => {
    
    return (
        <div>
            <Link href={`/products/${product.slug}`} style={{
                color: 'unset',
                textDecoration: 'unset'
            }}>
            <Box sx={{color: 'black'}} component={'img'} width={'100%'} src={product.image}/>
            <Box>
                <Typography variant='h6'>{product.title}</Typography>
            </Box>
            <Box>
                <Typography>Price : {product.range}</Typography>
            </Box>
            </Link>
            
        </div>
    )
}

export default Product
