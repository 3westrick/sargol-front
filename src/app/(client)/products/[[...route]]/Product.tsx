import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const Product = ({product}: {product: any}) => {
    // console.log(product)
    let stock_status = ""
    if (product.stock_status == 'out_of_stock'){
        stock_status = "Out of stock"
    }else if (product.stock_status == 'on_backorder'){
        stock_status = "On backorder"
    }

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
                <Typography>Price: {product.range}</Typography>
            </Box>
            {
                stock_status != "" && (
                    <Box>
                        <Typography>{stock_status}</Typography>
                    </Box>
                )
            }

            </Link>
            
        </div>
    )
}

export default Product
