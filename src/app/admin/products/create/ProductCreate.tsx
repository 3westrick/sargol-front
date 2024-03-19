"use client"
import RichTextEditor from '@/components/editor/RichTextEditor';
import { Box, Grid, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ProductData from './ProductData';
import { useAtom, useSetAtom } from 'jotai';
import { admin_product_MPN, admin_product_SKU, admin_product_description, admin_product_regular_price, admin_product_sale_price, admin_product_slug, admin_product_title } from '@/Atoms';
import TextEditor from '@/app/edit/TextEditor';
import ProductSide from './ProductSide';

import {useForm, FormProvider, useFieldArray}from "react-hook-form"
import ProductTitle from './ProductTitle';
import { useMutation } from '@tanstack/react-query';
import { createProduct } from '@/api/admin/products/productAPI';

type FormValue = {
  // main
  title: string,
  slug: string,
  description: string,
  short_description: string,

  // side
  categories: any[],
  tags: any[],

  image: any,
  gallery: any[]

  
  // general
  regular_price: number,
  sale_price: number,
  tax_status: string,
  tax_class: string,

  // inventory
  sku: string,
  mpn: string,
  stock_management: boolean,
  stock_status: string,
  sold_individually: boolean,
  stock: number,
  unit: string,

  // shipping
  weight: string,
  length: string,
  width: string,
  height: string,
  shipping_class: string,
  
  // attributes
  attributes: any[],
  selectedValues: {},
  visibleAttributes: {},
  variantAttributes: {},

  // variants
  variants: {
    key_id: Date,

    sku: string,
    attributes: any[],
    regular_price: number,
    sale_price: number,

    stock: number,

    weight: string,
    length: string,
    width: string,
    height: string,
    shipping_class: string,

    tax_class: string,

    description: string,
    mpn: string,
  }[],

}

const ProductCreate = () => {
  const [description, setDescription] = useAtom(admin_product_description)
  
  const methods = useForm<FormValue>({
    defaultValues:{
      title: '',
      slug: '',
      description: '',
      short_description: '',

      categories: [],
      tags: [],

      regular_price: 0,
      sale_price: 0,
      tax_status: 'none',
      tax_class: 'standard',

      sku: '',
      mpn: '',
      stock_management: false,
      stock_status: '',
      sold_individually: false,
      stock: 0,
      unit: '',

      weight: '',
      length: '',
      width: '',
      height: '',
      shipping_class: '',

      attributes: [],
      selectedValues: {},
      visibleAttributes: {},
      variantAttributes: {},
      variants: []
    }
  })
  const {register, handleSubmit} = methods

  const create_product = useMutation({
    mutationFn: (data) => createProduct(data),
    onSuccess: (res) => {
      console.log(res)
    }
  })

  function onSubmit(data: FormValue | any){
    create_product.mutate(data)
    // var form_data = new FormData();

    // for ( var key in data ) {
    //     if (typeof key == 'string')
    //     form_data.append(key, data[key]);
    // }

    // console.log(form_data.getAll('title'))
  }
  


  return (
    <Box>
      <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={9}>   
          <Box>

            <ProductTitle/>

            <Box mt={3}>
              <TextField {...register('slug')} fullWidth size='small' label={'Slug'} name='slug' />
            </Box>

            <Box mt={3}>
              {/* <TextEditor value={description} setValue={setDescription}/> */}
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
