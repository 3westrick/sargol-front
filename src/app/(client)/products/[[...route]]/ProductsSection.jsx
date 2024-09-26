import { Box, Grid, Pagination, Stack, Typography } from '@mui/material'
import React from 'react'
import Product from './Product'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const ProductsSection = () => {
    const pathname = usePathname();
    const router = useRouter()
    const searchParams = useSearchParams()    
  
  
    function get_page(){
      var num = searchParams.get('page')
      if (num){
        num = parseInt(num)
        if (isNaN(num)){
          return 1
        }else {
          return num
        }
      }
      return 1
    }
  
    const page = get_page()
  
    const handleChange = (event, value ) => {
      url_query(value, 'page',pathname, router, searchParams)
    };
    return (
        <>

            <Box>
              <Grid container>
                    {
                      data.results.map((product, index) => {
                        return <Grid item key={`${product.id}-${index}`} xs={4}>
                          <Product product={product} />
                        </Grid>
                      })
                    }
              </Grid>
            </Box>
            <Box>
              <Stack spacing={2}>
                <Typography>Page: {page}</Typography>
                <Pagination 
                count={Math.ceil(data.count / 12)} 
                page={page} 
                onChange={handleChange}
                />
              </Stack>
            </Box>
        
        </>
    )
}

export default ProductsSection
