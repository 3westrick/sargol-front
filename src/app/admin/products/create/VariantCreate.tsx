import { admin_product_variants } from '@/Atoms'
import MyFormControl from '@/components/admin/MyFormControl'
import SimpleRadio from '@/components/admin/SimpleRadio'
import SimpleSelect from '@/components/admin/SimpleSelect'
import { Box, TextField, Typography } from '@mui/material'
import { useAtom } from 'jotai'
import React from 'react'

const VariantCreate = ({ variant }: { variant: any }) => {
    // console.log(variant)

    const [variants, setVariants] = useAtom(admin_product_variants)
    const variant_index = variants.indexOf(variant)

    function handle_variant_change(data, type){
        const arr = [...variants]
        arr[variant_index][type] = data
        setVariants(arr)
    }

    return (
        <Box>
            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Regular Price'>
                    <TextField fullWidth type='number' size='small' value={variant.regular_price} onChange={(e)=> handle_variant_change(e.target.value, 'regular_price')}/>
                </MyFormControl>
            </Box>
            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Sale Price'>
                    <TextField fullWidth type='number' size='small' value={variant.sale_price} onChange={(e)=> handle_variant_change(e.target.value, 'sale_price')}/>
                </MyFormControl>
            </Box>

            <Box mt={3}>
                <Typography color={'grey.500'}>
                    // discount / wholesale
                </Typography>
            </Box>

            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Tax Status'>
                    <SimpleSelect value={variant.tax_status} setValue={(data) => handle_variant_change(data, 'tax_status')} label='Tax Status' 
                        options={[
                            {value: 'none', label: 'None'},
                            {value: 'taxable', label: 'Taxable'},
                        ]} />
                </MyFormControl>
            </Box>

            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Tax Class'>
                    <SimpleSelect value={variant.tax_class} setValue={(data) => handle_variant_change(data, 'tax_class')} label='Tax Status' 
                        options={[
                            {value: 'none', label: 'None'},
                            {value: 'standard', label: 'Standard'},
                        ]}
                    />
                </MyFormControl>
            </Box>

            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='SKU'>
                    <TextField fullWidth size='small' value={variant.sku} onChange={(e)=> handle_variant_change(e.target.value, 'sku')}/>
                </MyFormControl>
            </Box>

            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='MPN'>
                    <TextField fullWidth size='small' value={variant.mpn} onChange={(e)=> handle_variant_change(e.target.value, 'mpn')}/>
                </MyFormControl>
            </Box>

            <Box mt={3}>
                <Typography color={'grey.500'}>
                    // stock management
                </Typography>

                <Typography color={'grey.500'}>
                    // solid individuallity
                </Typography>
            </Box>

            <Box mt={3} display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                <MyFormControl label='Stock status'>
                    <SimpleRadio 
                        value={variant.stock}
                        setValue={(data) => handle_variant_change(data, 'stock')}
                        options={[
                            {value: 'in_stock', label: 'in stock'},
                            {value: 'out_of_stock', label: 'out of stock'},
                            {value: 'on_backorder', label: 'on backorder'},
                        ]}
                        label={null}
                    />
                </MyFormControl>
            </Box>

            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Initial number in stock'>
                    <TextField fullWidth size='small' value={variant.quantity} onChange={(e)=> handle_variant_change(e.target.value, 'quantity')}/>
                </MyFormControl>
            </Box>

            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Weight (kg)'>
                    <TextField fullWidth type='number' size='small' value={variant.weight} onChange={(e)=> handle_variant_change(e.target.value, 'weight')}/>
                </MyFormControl>
            </Box>

            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Dimensions (cm)'>
                    <Box width={'100%'} display={'flex'}>
                        <TextField sx={{width:90}} label="Length" type='number' size='small' value={variant.length} onChange={(e)=> handle_variant_change(e.target.value, 'length')}/>
                        <TextField sx={{width:90}} label="Width" type='number' size='small' value={variant.width} onChange={(e)=> handle_variant_change(e.target.value, 'width')}/>
                        <TextField sx={{width:90}} label="Height" type='number' size='small' value={variant.height} onChange={(e)=> handle_variant_change(e.target.value, 'height')}/>
                    </Box>
                </MyFormControl>
            </Box>

            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Shipping Class'>
                    <SimpleSelect value={variant.shipping_class} setValue={(data) => handle_variant_change(data, 'shipping_class')} label='Tax Status' 
                    options={[
                        {value: 'no_shipping_class', label: 'No shipping class'},
                    ]}
                    />
                </MyFormControl>
            </Box>

            

        </Box>
    )
}

export default VariantCreate
