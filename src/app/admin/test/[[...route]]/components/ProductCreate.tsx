"use client"
import { Box, Grid, Paper, TextField, Typography } from '@mui/material';
import { auth } from '@/lib/auth'
import React from 'react'
import ProductData from './ProductData';
import { useAtom } from 'jotai';
import { admin_product_description } from '@/Atoms';
import TextEditor from '@/app/edit/TextEditor';
import ProductSide from './ProductSide';

import {useForm, FormProvider, Controller}from "react-hook-form"
import ProductTitle from './ProductTitle';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createProduct, getProductWithId } from '@/api/admin/products/productAPI';
import ProductForm from './ProductForm';

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
  gallery: any[],

  
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
  selectedValues: any[],
  visibleAttributes: [],
  variantAttributes: [],

  // variants
  variants: {
    key_id: Date,

    sku: string,
    attributes: any[],
    regular_price: number,
    sale_price: number,

    stock: number,

    image: any,
    gallery: any[],

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
  
  const methods = useForm<FormValue>({
    defaultValues:{
      title: '',
      slug: '',
      description: '',
      short_description: '',

      categories: [],
      tags: [],

      image: undefined,
      gallery: [],

      regular_price: 0,
      sale_price: 0,
      tax_status: 'none',
      tax_class: 'none',

      sku: '',
      mpn: '',
      stock_management: false,
      stock_status: 'in_stock',
      sold_individually: false,
      stock: 0,
      unit: '',

      weight: '',
      length: '',
      width: '',
      height: '',
      shipping_class: '',

      attributes: [
        // {
        //   id: 1,
        //   title: 'Color',
        //   slug: 'color',
        //   type: 'normal',
        //   values: [
        //     { id: 1, title: 'Red', slug: 'red', image: null, color: null },
        //     { id: 2, title: 'Blue', slug: 'blue', image: null, color: null },
        //     { id: 3, title: 'Green', slug: 'green', image: null, color: null }
        //   ]
        // },
        // {
        //   id: 2,
        //   title: 'Size',
        //   slug: 'size',
        //   type: 'normal',
        //   values: [
        //     { id: 4, title: 'Sm', slug: 'sm', image: null, color: null },
        //     { id: 5, title: 'Ms', slug: 'ms', image: null, color: null },
        //     { id: 6, title: 'Lg', slug: 'lg', image: null, color: null },
        //     { id: 7, title: 'Xl', slug: 'xl', image: null, color: null }
        //   ]
        // }
      ]
      
      ,



      selectedValues: [
        // { id: 1, title: 'Red', slug: 'red', image: null, color: null },
        // { id: 2, title: 'Blue', slug: 'blue', image: null, color: null },
        // { id: 4, title: 'Sm', slug: 'sm', image: null, color: null },
      ],
      visibleAttributes: [],
      variantAttributes: [],
      variants: []
    }

  })
  const {register, handleSubmit, control} = methods

  const create_product = useMutation({
    mutationFn: (data: any) => createProduct(data),
    onSuccess: (res) => {
      console.log(res)
    },
    onError: (error) => {
      console.log(error)
    }

  })

  function onSubmit(data: FormValue | any){
    // create_product.mutate(data)
    // console.log(data)
    // return
    
    const form_data = new FormData()

    for ( let key in data ) {
      if (key == 'gallery'){
        for(let i = 0; i < data[key]?.length; i++){
          form_data.append(key, data[key][i].file);
        }
      }else if(key == 'attributes'){
        data.attributes.map((item:any) => form_data.append(key, item.id))
      }else if(key == 'categories'){
        data.categories.map((item:any) => form_data.append(key, item))
      }else if(key == 'selectedValues'){
        data.selectedValues.map((item:any) => form_data.append('values', item.id))
      }else if(key == 'visibleAttributes' || key == 'variantAttributes'){
        data[key].map((item:any) => form_data.append(key, item))
      }else if(key == 'image'){
        if(data[key]) form_data.append(key, data[key]);
      }else{
        form_data.append(key, data[key]);
      }
    }
    
    // console.log(...form_data)
    create_product.mutate(form_data)
  }
  


  return (
    <Box>
      <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ProductForm/>
      </form>
      </FormProvider>
    </Box>
  )
}

export default ProductCreate
