"use client"
import RichTextEditor from '@/components/editor/RichTextEditor';
import { Box, Grid, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ProductData from './ProductData';
import { useAtom, useSetAtom } from 'jotai';
import { admin_product_MPN, admin_product_SKU, admin_product_description, admin_product_regular_price, admin_product_sale_price, admin_product_slug, admin_product_title } from '@/Atoms';
import TextEditor from '@/app/edit/TextEditor';
import ProductSide from './ProductSide';

import {useForm, FormProvider}from "react-hook-form"

type FormValue = {
  title: string,
  slug: string,
  short_description: string,
  regular_price: string,
  sale_price: string,
  tax_status: string,
  tax_class: string
}

const ProductCreate = () => {
  const setRegularPrice = useSetAtom(admin_product_regular_price)
  const setSalePrice = useSetAtom(admin_product_sale_price)
  const setSku = useSetAtom(admin_product_SKU)
  const setMpn = useSetAtom(admin_product_MPN)
  const [description, setDescription] = useAtom(admin_product_description)

  const [title, setTitle] = useAtom(admin_product_title)
  const [slug, setSlug] = useAtom(admin_product_slug)

  const methods = useForm<FormValue>({
    defaultValues:{
      title: '',
      slug: '',
      short_description: '',
      regular_price: '',
      sale_price: '',
      tax_status: 'none',
      tax_class: 'standard'
    }
  })
  const {register, handleSubmit} = methods

  function onSubmit(data: FormValue){
    console.log(data)
  }
  

  useEffect(() => {
    setRegularPrice(0)
    setSalePrice(0)
    setDescription('')
    setSku('')
    setMpn('')
  }, [])


  return (
    <Box>
      <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={9}>   
          <Box>

            <Box>
              <TextField {...register('title')} fullWidth size='small' label={'Title'} name='title' />
            </Box>

            <Box mt={3}>
              <TextField {...register('slug')} fullWidth size='small' label={'Slug'} name='slug' />
            </Box>

            <Box mt={3}>
              <TextEditor value={description} setValue={setDescription}/>
              {/* <TextField multiline rows={3} fullWidth size='small' label={'Product description'} name='description' /> */}
            </Box>

            <Box mt={3}>
              <TextField {...register('short_description')} multiline minRows={3} fullWidth size='small' label={'Product short description'} name='short_description' />
            </Box>

            <Box mt={3}>
              <Typography>
                Product Data
              </Typography>

              <Box mt={3}>
                <Paper elevation={4}>
                  <Box>
                    <ProductData/>
                  </Box>
                </Paper>
              </Box>

            </Box>

          </Box>
        </Grid>

        <Grid item xs={3}>
          <ProductSide/>
        </Grid>

      </Grid>
      </form>
      </FormProvider>
    </Box>
  )
}

export default ProductCreate
