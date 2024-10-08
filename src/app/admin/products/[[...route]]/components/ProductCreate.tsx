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
import { createProduct, createVariant, getProductWithId } from '@/api/admin/products/productAPI';
import ProductForm from './ProductForm';
import { useRouter } from "next/navigation";

type FormVariant ={
  key_id: string,
  sku: string,
  attributes: any[],
  values: any[],
  regular_price: number,
  sale_price: number,

  quantity: number,

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
}

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

  type: string,
  
  // general
  regular_price: number,
  sale_price: number,
  tax_status: string,
  tax_class: string,

  // inventory
  sku: string,
  mpn: string,
  stock_management: boolean,
  backorder: string,
  stock_status: string,
  sold_individually: boolean,
  quantity: number,
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
  variants: FormVariant[],

}

const ProductCreate = () => {
  const router = useRouter()
  const methods = useForm<FormValue>({
    defaultValues:{
      title: '',
      slug: '',
      description: '',
      short_description: '',

      type: 'simple',
      backorder: 'not_allow',

      categories: [],
      tags: [],

      image: undefined,
      gallery: [],

      regular_price: 0,
      sale_price: 0,
      tax_status: 'none',
      tax_class: '1',

      sku: '',
      mpn: '',
      stock_management: true,
      stock_status: 'in_stock',
      sold_individually: false,
      stock: 0,
      unit: '',

      weight: '',
      length: '',
      width: '',
      height: '',
      shipping_class: '1',

      attributes: [],
      selectedValues: [],
      visibleAttributes: [],
      variantAttributes: [],
      variants: [],
    }

  })
  const {register, handleSubmit, control, getValues} = methods

  const create_variant = useMutation({
    mutationFn: (data: any) => createVariant(data),
    onSuccess: (res, variables, context) => {
      // console.log(res)
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const create_product = useMutation({
    mutationFn: (data: any) => createProduct(data),
    onSuccess: (res, variables, context) => {
      const variants = getValues('variants')
      const parent_id = res.id

      variants.map((variant: FormVariant | any) => {
        const form_data = new FormData()

        form_data.append('parent', parent_id)
        form_data.append('slug', variant.id)
        
        for ( let k in variant ) {
          if (k == 'gallery'){
            for(let i = 0; i < variant[k]?.length; i++){
              form_data.append(k, variant[k][i].file);
            }
          }else if(k == 'image'){
            if(variant[k]) form_data.append(k, variant[k]);
          }else if(k == 'attributes'){
            variant.attributes.map((item:any) => form_data.append(k, item))
          }else if(k == 'values'){
            variant.values.map((item:any) => form_data.append(k, item))
          }else if(k == 'quantity'){
            if(res.stock_management){
              if (variant[k] == '' || variant[k] == null){
                form_data.append(k, res.quantity);
              }else{
                form_data.append(k, variant[k]);
              }
            }else{
              form_data.append(variant, '0');
            }
          }else if(k == 'shipping_class') {
            if (variant[k] == '0'){
              form_data.append(k, res.shipping_class);
            }else{
              form_data.append(k, variant[k]);
            }
          }else if(k == 'tax_class') {
            if (variant[k] == '0'){
              form_data.append(k, res.tax_class);
            }else{
              form_data.append(k, variant[k]);
            }
          }else{
            form_data.append(k, variant[k])
          }
        }
        form_data.append('type', 'variant')
        create_variant.mutate(form_data)
      })

      router.push(`/admin/products/edit/${res.id}`)
    },
    onError: (error) => {
      console.log(error)
    }
  })


  function onSubmit(data: FormValue | any){
    if (data.sale_price == "") data.sale_price = 0
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
      }else if(key == 'quantity'){
        if(data['stock_management']){
          if (data[key] == '' || data[key] == null){
            form_data.append(key, '0');
          }else{
            form_data.append(key, data[key]);
          }
        }else{
          form_data.append(key, '0');
        }
      }else{
        form_data.append(key, data[key]);
      }
    }
    
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
