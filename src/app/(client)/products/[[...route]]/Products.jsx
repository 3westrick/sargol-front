"use client"
import { getProducts } from '@/api/client/products/productAPI'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useRef, useState } from 'react'
import Product from './Product'
import { Box, Grid, Pagination, Stack, TextField, Typography } from '@mui/material'
import { debounce} from '@mui/material/utils'
import { getWidget } from '@/api/client/widgets/widgetAPI'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { get_page, url_query } from '@/utils/urls'
import ProductFilterCategory from './components/ProductFilterCategory'
import ProductFilterAttribute from './components/ProductFilterAttribute'
import ProductFilterPrice from './components/ProductFilterPrice'
import ProductFilterRating from './components/ProductFilterRating'
import { client_products_query } from '@/Atoms' 
import { useAtom } from 'jotai'

const Products = () => {
  const [queries, setQueries] = useAtom(client_products_query)

  const myRef = useRef(null);
  
  const [first, set_first] = useState(true)

  const pathname = usePathname();
  const router = useRouter()
  const searchParams = useSearchParams()    

  const search = searchParams.get('search') ?? '';

  const page = get_page(searchParams)

  const handleChange = (event, value ) => {
    url_query(value, 'page',pathname, router, searchParams)
  };

  
  const {
      data, 
      isLoading,
  } = useQuery({
      queryKey: ['products', {search , queries}, page],
      queryFn: () => getProducts(search, page, queries),
      keepPreviousData : true
  })



  const {data: widgetGroup} = useQuery({
    queryKey: ['widgets', 'shop_page_widget_area'],
    queryFn: () => getWidget('shop_page_widget_area'),
  })

  const prices = data ? data.results.map((product, index) => product.regular_price)[0] : [500]
  const max_price = Math.max(...prices)

  useEffect(() => {
    if (first){
      set_first(false)
    }else{
      if (!isLoading){
        myRef.current?.scrollIntoView()      
      }
    }
  },[isLoading, page])

  return (
    <Box>
      <Box>
        <TextField defaultValue={search} onChange={debounce(e => {
          url_query(e.target.value, 'search',pathname, router, searchParams);
          url_query('', 'page',pathname, router, searchParams);
        },500)}
        />
      </Box>

      <Box>
        {widgetGroup.widgets.map((widget) => {
          if(widget.type == 'category') return <ProductFilterCategory key={widget.id} widget={widget}/>
          if(widget.type == 'attribute') return <ProductFilterAttribute key={widget.id} widget={widget}/>
          if(widget.type == 'price') return <ProductFilterPrice key={widget.id} widget={widget} max_price={max_price}/>
          if(widget.type == 'rating') return <ProductFilterRating key={widget.id} widget={widget}/>
        })}
      </Box>

      <div ref={myRef} id='my-section'>
      {
        !(isLoading) && <>
            <Box >
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
                count={Math.ceil(data.count / 6)} 
                page={page} 
                onChange={handleChange}
                />
              </Stack>
            </Box>
          </>
      }
      </div>

    </Box>
  )
}

export default Products
