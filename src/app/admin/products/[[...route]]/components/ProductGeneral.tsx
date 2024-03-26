import MyFormControl from '@/components/admin/MyFormControl'
import SimpleSelect from '@/components/admin/SimpleSelect'
import TaxClassSelect from '@/components/admin/TaxClassSelect'
import TaxStatusSelect from '@/components/admin/TaxStatusSelect'
import { Box, InputLabel, TextField, Typography } from '@mui/material'
import { useAtom } from 'jotai'
import React from 'react'
import { useFormContext } from 'react-hook-form'

const ProductGeneral = () => {

    const methods = useFormContext()
    const {register} = methods


    // console.log({...register('tax_status')})

    return (
        <Box>
            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Regular Price'>
                    <TextField {...register('regular_price')} fullWidth type='number' size='small' />
                </MyFormControl>
            </Box>
            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Sale Price'>
                    <TextField {...register('sale_price')} fullWidth type='number' size='small' />
                </MyFormControl>
            </Box>


            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Tax Status'>
                    <TaxStatusSelect label={'tax_status'}/>
                </MyFormControl>
            </Box>

            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Tax Class'>
                    <TaxClassSelect label='tax_class'/>
                </MyFormControl>
            </Box>
        </Box>
    )
}

export default ProductGeneral
