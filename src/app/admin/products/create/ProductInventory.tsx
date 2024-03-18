"use client"
import { admin_product_MPN, admin_product_SKU, admin_product_quantity, admin_product_stock, admin_product_unit } from '@/Atoms'
import MyFormControl from '@/components/admin/MyFormControl'
import SimpleRadio from '@/components/admin/SimpleRadio'
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, TextField, Typography } from '@mui/material'
import { useAtom } from 'jotai'
import React, { useState } from 'react'

const ProductInventory = () => {
    const [sku, setSku] = useAtom(admin_product_SKU)
    const [mpn, setMpn] = useAtom(admin_product_MPN)
    const [stock, setStock] = useAtom(admin_product_stock)
    const [quantity, setQuantity] = useAtom(admin_product_quantity)
    const [unit, setUnit] = useAtom(admin_product_unit)

    return (
        <Box>
            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='SKU'>
                    <TextField fullWidth size='small' value={sku} onChange={(e)=> setSku(e.target.value)}/>
                </MyFormControl>
            </Box>

            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='MPN'>
                    <TextField fullWidth size='small' value={mpn} onChange={(e)=> setMpn(e.target.value)}/>
                </MyFormControl>
            </Box>

            <Box mt={3}>
                <Box display={'flex'} alignItems={'center'}>
                <InputLabel sx={{width: 200}}>Stock management</InputLabel>
                <FormControlLabel
                    control={<Checkbox/>}
                    label={'Track stock quantity for this product'}
                />
                </Box>
            </Box>


            {/* Sold individuality */}
            {/* Limit purchases to 1 item per order */}

            <Box mt={3} display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                <MyFormControl label='Stock status'>
                    <SimpleRadio 
                        value={stock}
                        setValue={setStock}
                        options={[
                            {value: 'in_stock', label: 'in stock'},
                            {value: 'out_of_stock', label: 'out of stock'},
                            {value: 'on_backorder', label: 'on backorder'},
                        ]}
                        label={null}
                    />
                </MyFormControl>
            </Box>


            <Box mt={3}>
                <Box display={'flex'} alignItems={'center'}>
                <InputLabel sx={{width: 200}}>Sold individuality</InputLabel>
                <FormControlLabel
                    control={<Checkbox/>}
                    label={'Limit purchases to 1 item per order'}
                />
                </Box>
            </Box>

            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Initial number in stock'>
                    <TextField fullWidth size='small' value={quantity} onChange={(e)=> setQuantity(e.target.value)}/>
                </MyFormControl>
            </Box>

            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Unit of measurement'>
                    <TextField fullWidth size='small' value={unit} onChange={(e)=> setUnit(e.target.value)}/>
                </MyFormControl>
            </Box>

        </Box>
    )
}

export default ProductInventory
