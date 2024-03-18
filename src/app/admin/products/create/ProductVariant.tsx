import { admin_product_attributes, admin_product_attributes_variant, admin_product_attributes_visible, admin_product_values, admin_product_variants } from '@/Atoms'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Divider, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import { useAtom, useAtomValue } from 'jotai'
import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MyAccordion from '@/components/admin/MyAccordion';
import VariantCreate from './VariantCreate';

const ProductVariant = () => {
  const [variants, setVariants] = useAtom(admin_product_variants)
  const attributes = useAtomValue(admin_product_attributes)
  const values = useAtomValue(admin_product_values)
  const attributes_variant = useAtomValue(admin_product_attributes_variant)
  // const attributes_visible = useAtomValue(admin_product_attributes_visible)

  const att_value_variant = structuredClone(attributes).filter(att => {
    if (attributes_variant[att.id]){
      att.values = values[att.id]
      return att
    }
  })
  // console.log(att_value_variant)
  // console.log(attributes)
  // console.log(attributes_variant)
  // console.log(attributes_visible)
  // console.log(values)

  function new_variant(){
    const obj = {}
    att_value_variant.map(item => {
      obj[item.id] = 'all'
    })
    return {
      key_id: Date.now(),
      attributes: obj,
      regular_price: 0,
      sale_price: 0,
      tax_status: '',
      tax_class: '',
      description: '',
      sku: '',
      mpn: '',
      stock: 'in_stock',
      quantity: 0,

      weight: '',
      width: '',
      height: '',
      length: '',

      shipping_class: '',

    }
  }

  function add_variant(){
    // variants.push(new_variant())
    const arr = [...variants]
    arr.push(new_variant())
    setVariants(arr)
    // setVariants(prev => prev.push(new_variant()))
  }

  function variant_attribute_change(variant_id, att_id, value){
    const arr = [...variants]
    const vari = arr.find(variant => variant.key_id == variant_id)
    const variant_index = arr.indexOf(vari)
    arr[variant_index].attributes[att_id] = value

    setVariants(arr)
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
    setVariants(arr)
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
          <VariantCreate variant={variant}/>
        </AccordionDetails>
      </MyAccordion>

      })}
      </Box>

      {/* <Box mt={3}>
        <Button type='button' variant='contained' sx={{textTransform: 'unset'}} onClick={() => console.log(att_value_variant)}>
          Save changes
        </Button>
        <Button type='button' variant='contained' sx={{textTransform: 'unset', ml: 2}} onClick={() => console.log(variants)}>
          Cancel
        </Button>
      </Box> */}
      
    </Box>
  )
}

export default ProductVariant
