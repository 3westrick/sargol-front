import { admin_product_regular_price, admin_product_sale_price, admin_product_tax_class, admin_product_tax_status } from '@/Atoms'
import MyFormControl from '@/components/admin/MyFormControl'
import SimpleSelect from '@/components/admin/SimpleSelect'
import { Box, InputLabel, TextField, Typography } from '@mui/material'
import { useAtom } from 'jotai'
import React from 'react'
import { useFormContext } from 'react-hook-form'

const ProductGeneral = () => {
    const [regularPrice, setRegularPrice] = useAtom(admin_product_regular_price)
    const [salePrice, setSalePrice] = useAtom(admin_product_sale_price)
    const [taxStatus, setTaxStatus] = useAtom(admin_product_tax_status)
    const [taxClass, setTaxClass] = useAtom(admin_product_tax_class)

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

            <Box mt={3}>
                <Typography color={'grey.500'}>
                    // discount / wholesale
                </Typography>
            </Box>

            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Tax Status'>
                    <SimpleSelect register={register('tax_status')} label='Tax Status' 
                        options={[
                            {value: 'none', label: 'None'},
                            {value: 'taxable', label: 'Taxable'},
                        ]} />
                </MyFormControl>
            </Box>

            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Tax Class'>
                    <SimpleSelect register={register('tax_class')} label='Tax Class' 
                        options={[
                            {value: 'none', label: 'None'},
                            {value: 'standard', label: 'Standard'},
                        ]}
                    />
                </MyFormControl>
            </Box>
        </Box>
    )
}

export default ProductGeneral
