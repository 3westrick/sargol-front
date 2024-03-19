"use client"
import { Box, Grid, Paper, TextField, Typography } from '@mui/material';
import React from 'react'
import ProductData from './ProductData';
import { useAtom } from 'jotai';
import { admin_product_description } from '@/Atoms';
import TextEditor from '@/app/edit/TextEditor';
import ProductSide from './ProductSide';

import {useForm, FormProvider}from "react-hook-form"
import ProductTitle from './ProductTitle';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { editProduct, getProductWithId } from '@/api/admin/products/productAPI';
import ProductForm from './ProductForm';
import { getAttributes } from '@/api/admin/attributes/attributeAPI';

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

const ProductEdit = ({productID}: {productID: number}) => {

  const {data: product} = useQuery({
    queryKey: ['admin-product', productID],
    queryFn: () => getProductWithId(productID),
  })
  
  
  const methods = useForm<FormValue>({
    defaultValues: {
        title: product.title,
        slug: product.slug,
        description: product.description,
        short_description: product.short_description,
  
        categories: product.categories,
        tags: [],

        image: product.image,
        gallery: product.gallery,

        regular_price: product.regular_price,
        sale_price: product.sale_price,
        tax_status: product.tax_status,
        tax_class: product.tax_class,
  
        sku: product.sku,
        mpn: product.mpn,
        stock_management: product.stock_management,
        stock_status: product.stock_status,
        sold_individually: product.sold_individually,
        stock: product.stock,
        unit: product.unit,
  
        weight: product.weight,
        length: product.length,
        width: product.width,
        height: product.height,
        shipping_class: product.shipping_class,
  
        attributes: product.attributes.map((item: any) => item.attribute),
        selectedValues: product.values,
        visibleAttributes: product.attributes.filter((item: any) => item.visible).map((item: any) => item.attribute.id),
        variantAttributes: product.attributes.filter((item: any) => item.variant).map((item: any) => item.attribute.id),
        variants: []
      }
  })
  const {handleSubmit} = methods

  const queryClient = useQueryClient()

  const edit_product = useMutation({
    mutationFn: (data: any) => editProduct(productID, data),
    onSuccess: (res) => {
      console.log(res)
      queryClient.invalidateQueries({queryKey: ['admin-product', productID]})
    }
  })

  function onSubmit(data: FormValue | any){
    const form_data = new FormData()
    for ( let key in data ) {
      if (key == 'gallery'){
        for(let i = 0; i < data[key]?.length; i++){
          if (data[key][i].image)
            form_data.append(key, data[key][i].id);
          else
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
        if(data[key] && typeof data[key] != 'string') form_data.append(key, data[key]);
      }else{
        form_data.append(key, data[key]);
      }
    }

    // console.log(...form_data)
    edit_product.mutate(form_data)
    
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

export default ProductEdit
