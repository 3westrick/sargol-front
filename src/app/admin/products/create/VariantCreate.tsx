import { admin_product_variants } from '@/Atoms'
import MyFormControl from '@/components/admin/MyFormControl'
import ShippingClassSelect from '@/components/admin/ShippingClassSelect'
import SimpleRadio from '@/components/admin/SimpleRadio'
import SimpleSelect from '@/components/admin/SimpleSelect'
import TaxClassSelect from '@/components/admin/TaxClassSelect'
import { Box, FormControl, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useAtom } from 'jotai'
import React from 'react'
import { useFormContext } from 'react-hook-form'

const VariantCreate = ({ variant, index }: { variant: any, index: number }) => {
    // console.log(variant)

    const methods = useFormContext()
    const {register, control, watch, getValues, setValue} = methods
    const variants = watch('variants')
    
    function handle_variant_change(data:any, type:string){
        const arr = [...variants]
        arr[index][type] = data
        setValue('variants', arr)
    }

    return (
        <Box>

            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='SKU'>
                    <TextField fullWidth size='small' {...register(`variants.${index}.sku`)}/>
                </MyFormControl>
            </Box>

            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Regular Price'>
                    <TextField fullWidth type='number' size='small' {...register(`variants.${index}.regular_price`)}/>
                </MyFormControl>
            </Box>

            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Sale Price'>
                    <TextField fullWidth type='number' size='small' {...register(`variants.${index}.sale_price`)} />
                </MyFormControl>
            </Box>


            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Stock quantity'>
                    <TextField fullWidth size='small' {...register(`variants.${index}.stock`)}/>
                </MyFormControl>
            </Box>



            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Weight (kg)'>
                    <TextField fullWidth type='number' size='small' {...register(`variants.${index}.weight`)}/>
                </MyFormControl>
            </Box>

            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Dimensions (cm)'>
                    <Box width={'100%'} display={'flex'}>
                        <TextField sx={{width:90}} label="Length" type='number' size='small' {...register(`variants.${index}.length`)}/>
                        <TextField sx={{width:90}} label="Width" type='number' size='small' {...register(`variants.${index}.width`)}/>
                        <TextField sx={{width:90}} label="Height" type='number' size='small' {...register(`variants.${index}.height`)}/>
                    </Box>
                </MyFormControl>
            </Box>


            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Shipping class'>
                <FormControl fullWidth size="small">
                    <Select
                    
                    onChange={(event, data: any) =>  handle_variant_change(data?.props.value, 'shipping_class')}
                    value={variants[index].shipping_class}
                    >
                        <MenuItem value={'no_shipping_class'}>No shipping class</MenuItem>
                        <MenuItem value={'shipping_class'}>class</MenuItem>
                    </Select>
                </FormControl>
                </MyFormControl>
            </Box>



            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <MyFormControl label='Tax class'>
                <FormControl fullWidth size="small">
                    <Select
                    
                    onChange={(event, data: any) =>  handle_variant_change(data?.props.value, 'tax_class')}
                    value={variants[index].tax_class}
                    >
                        <MenuItem value={'none'}>None</MenuItem>
                        <MenuItem value={'standard'}>Standard</MenuItem>
                    </Select>
                </FormControl>
            </MyFormControl>
            </Box>

            <Box mt={3}>
              <TextField multiline minRows={3} fullWidth size='small' label={'Description'} {...register(`variants.${index}.description`)} />
            </Box>



            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='MPN'>
                    <TextField fullWidth size='small' {...register(`variants.${index}.mpn`)}/>
                </MyFormControl>
            </Box>


            {/* <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Shipping Class'>
                    <SimpleSelect value={variant.shipping_class} setValue={(data) => handle_variant_change(data, 'shipping_class')} label='Tax Status' 
                    options={[
                        {value: 'no_shipping_class', label: 'No shipping class'},
                    ]}
                    />
                </MyFormControl>
            </Box> */}

            

        </Box>
    )
}

export default VariantCreate
