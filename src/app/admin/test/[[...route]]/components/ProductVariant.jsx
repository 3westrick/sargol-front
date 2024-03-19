import { AccordionDetails, AccordionSummary, Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MyAccordion from '@/components/admin/MyAccordion';
import VariantCreate from './VariantCreate';
import { useFormContext, useFieldArray } from 'react-hook-form';

const ProductVariant = () => {

  const methods = useFormContext()
  const { watch, setValue, control} = methods
  const {
    selectedValues: values,
    variantAttributes: attributes_variant, 
    attributes,
} = watch()

  const {fields: variants, append} = useFieldArray({
    name: 'variants',
    control: control
  })


  const att_value_variant = structuredClone(attributes).filter((att) => {
    if (attributes_variant[att.id]){
      att.values = values[att.id]
      return att
    }
  })
  

  function new_variant(){
    const obj = {}
    att_value_variant.map(item => {
      obj[item.id] = 'all'
    })
    return {
      key_id: Date.now(),
      sku: '',
      attributes: obj,
      regular_price: 0,
      sale_price: 0,
  
      stock: 0,
  
      weight: '',
      length: '',
      width: '',
      height: '',
      shipping_class: 'no_shipping_class',
  
      tax_class: 'none',

      image: null,
      gallery: [],
  
      description: '',
      mpn: '',

    }
  }

  function add_variant(){
    // variants.push(new_variant())

    append(new_variant())
    // const arr = [...variants]
    // arr.push(new_variant())
    // console.log(arr)
    // setValue('variants',arr)
    // setVariants(prev => prev.push(new_variant()))
  }

  function variant_attribute_change(variant_id, att_id, value){
    const arr = [...variants]
    const vari = arr.find(variant => variant.key_id == variant_id)
    const variant_index = arr.indexOf(vari)
    arr[variant_index].attributes[att_id] = value

    setValue('variants',arr)
    // vari.attributes[att_id] = value
  }

  function generate_variations() {
    // console.log(att_value_variant)

    // att_value_variant.map(attibute => {
    //   attibute.values.map(value => {
    //     console.log(attibute.id, value.id)
    //   })
    // })

  }

  function removeVariant(variant_id){
    const arr = variants.filter(variant => variant.key_id != variant_id)
    setValue('variants',arr)
  }

  return (
    <Box>
      <Box>
        <Button type='button' variant='contained' sx={{textTransform: 'unset'}} onClick={() => generate_variations()}>
          Generate variations
        </Button>

        <Button type='button' variant='contained' sx={{textTransform: 'unset', ml: 2}}
        onClick={() => add_variant()}
        >
          Add manually
        </Button>
      </Box>

      <Box mt={3}>
      {variants.map((variant, index) => {
        return <MyAccordion key={variant.key_id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                  >
          <Stack direction={'row'} gap={2} alignItems={'center'} py={1} width={'100%'}>
          <Typography fontWeight={600}>{variant.key_id}</Typography>
          {att_value_variant.map(item => {
            return (

              <FormControl key={`${variant.key_id}-${item.id}`} size="small" sx={{width:150}}>
              <InputLabel id="demo-simple-select-label">{item.title}</InputLabel>
              <Select
                value={variant.attributes[item.id]}
                label={item.title}
                onChange={(e) => variant_attribute_change(variant.key_id, item.id, e.target.value)}
              >
                <MenuItem value={'all'}>For any {item.title}</MenuItem>
                {item.values.map(val => (
                  <MenuItem key={`${variant.key_id}-${item.id}-${val.id}`} value={val.id}>{val.title}</MenuItem>
                ))}
              </Select>
            </FormControl>
            )
          })}
          <Button onClick={() => removeVariant(variant.key_id)} variant='outlined' color='error' sx={{textTransform: 'unset', ml: 'auto', mr: 5}}>
            Remove
          </Button>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <VariantCreate index={index}/>
        </AccordionDetails>
      </MyAccordion>

      })}
      </Box>
      
    </Box>
  )
}

export default ProductVariant
