"use client"
import { Box} from '@mui/material';
import React from 'react'

import {useForm, FormProvider}from "react-hook-form"
import ProductTitle from './ProductTitle';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createVariant,editVariant , editProduct, getProductWithId } from '@/api/admin/products/productAPI';
import ProductForm from './ProductForm';
import { getAttributes } from '@/api/admin/attributes/attributeAPI';
import { useRouter } from 'next/navigation';

type FormVariant ={
  id: string | number,
  key_id: string,

  type: string,
  sku: string,
  attributes: any[],
  values: any[],
  regular_price: number,
  sale_price: number,

  quantity: number,
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
}

type FormValue = {
  // main
  title: string,
  slug: string,
  type: string,
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
  quantity: number,
  stock: number,
  unit: string,
  backorder: string,

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
  variants: FormVariant[],

}

const ProductEdit = ({productID}: {productID: number}) => {
  const router = useRouter()
  const {data: product} = useQuery({
    queryKey: ['admin-product', productID],
    queryFn: () => getProductWithId(productID),
  })
  
  
  const methods = useForm<FormValue>({
    defaultValues: {
        title: product.title,
        slug: product.slug,
        type: product.type,
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
        backorder: product.backorder,
        quantity: product.quantity,
  
        weight: product.weight,
        length: product.length,
        width: product.width,
        height: product.height,
        shipping_class: product.shipping_class,
  
        attributes: product.attributes.map((item: any) => item.attribute),
        selectedValues: product.values,
        visibleAttributes: product.attributes.filter((item: any) => item.visible).map((item: any) => item.attribute.id),
        variantAttributes: product.attributes.filter((item: any) => item.variant).map((item: any) => item.attribute.id),
        variants: product.variants.map((item: FormVariant) => ({...item, key_id: item.id}))
      },
  })
  const {handleSubmit, getValues, reset} = methods

  const queryClient = useQueryClient()


  const create_variant = useMutation({
    mutationFn: (data: any) => createVariant(data),
    onSuccess: (res, variables, context) => {
      console.log(res)
    },
    onError: (error) => {
      console.log(error)
    }
  })


  const edit_variant = useMutation({
    mutationFn: (data: any) => editVariant(data),
    onSuccess: (res, variables, context) => {
      console.log(res)
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const edit_product = useMutation({
    mutationFn: (data: any) => editProduct(productID, data),
    onSuccess: (res) => {
      const variants = getValues('variants')
      const parent_id = res.id

      variants.map((variant: FormVariant | any) => {
        const form_data = new FormData()
        form_data.append('parent', parent_id)
        form_data.append('slug', variant.key_id)

        for ( let k in variant ) {
          if (k == 'gallery'){
            for(let i = 0; i < variant[k]?.length; i++){
              if (variant[k][i].image)
                form_data.append(k, variant[k][i].id);
              else
                form_data.append(k, variant[k][i].file);
            }
          }else if(k == 'image'){
            if(variant[k] && typeof variant[k] != 'string') form_data.append(k, variant[k]);
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
        // form_data.get('key_id')
        // console.log(!isNaN(variant.key_id))
        if(!isNaN(variant.key_id)){
          // edit
          edit_variant.mutate(form_data)
        }else{
          // create
          create_variant.mutate(form_data)
        }

      })
      queryClient.invalidateQueries({queryKey: ['admin-product', productID]})
      router.push(`/admin/products/edit/${res.id}`)
    }
  })

  function onSubmit(data: FormValue | any){
    if (data.sale_price == "") data.sale_price = 0

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
      }else if(key == 'variants'){
        data.variants.map((item:any) => !isNaN(item.key_id) && form_data.append('variants', item.key_id))

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
