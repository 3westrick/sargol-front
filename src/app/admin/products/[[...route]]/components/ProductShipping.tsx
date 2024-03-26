import { admin_product_height, admin_product_length, admin_product_shipping_class, admin_product_weight, admin_product_width } from '@/Atoms'
import MyFormControl from '@/components/admin/MyFormControl'
import ShippingClassSelect from '@/components/admin/ShippingClassSelect'
import SimpleSelect from '@/components/admin/SimpleSelect'
import { Box, Divider, TextField } from '@mui/material'
import { useAtom } from 'jotai'
import React from 'react'
import { useFormContext } from 'react-hook-form'

const ProductShipping = () => {

    const {register} = useFormContext()

    return (
        <Box>
            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Weight (kg)'>
                    <TextField fullWidth type='number' size='small' {...register('weight')}/>
                </MyFormControl>
            </Box>

            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Dimensions (cm)'>
                    <Box width={'100%'} display={'flex'}>
                        <TextField sx={{width:90}} label="Length" type='number' size='small' {...register('length')}/>
                        <TextField sx={{width:90}} label="Width" type='number' size='small' {...register('width')}/>
                        <TextField sx={{width:90}} label="Height" type='number' size='small' {...register('height')}/>
                    </Box>
                </MyFormControl>
            </Box>

            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Shipping Class'>
                    <ShippingClassSelect label='shipping_class'/>
                </MyFormControl>
            </Box>

        
        </Box>
    )
}

export default ProductShipping
