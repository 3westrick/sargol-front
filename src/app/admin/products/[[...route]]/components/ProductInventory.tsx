"use client"
import { admin_product_MPN, admin_product_SKU, admin_product_quantity, admin_product_stock, admin_product_unit } from '@/Atoms'
import MyFormControl from '@/components/admin/MyFormControl'
import SimpleRadio from '@/components/admin/SimpleRadio'
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, TextField, Typography } from '@mui/material'
import { useAtom } from 'jotai'
import React, { useState } from 'react'
import { useFormContext, Controller } from 'react-hook-form'

const ProductInventory = () => {

    const {register, control, getValues, watch} = useFormContext()

    return (
        <Box>
            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='SKU'>
                    <TextField fullWidth size='small' {...register('sku')}/>
                </MyFormControl>
            </Box>

            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='MPN'>
                    <TextField fullWidth size='small' {...register('mpn')} />
                </MyFormControl>
            </Box>

            <Box mt={3}>
                <Box display={'flex'} alignItems={'center'}>
                <InputLabel sx={{width: 200}}>Stock management</InputLabel>
                <Controller
                name='stock_management'
                control={control}
                // rules={}
                render={({ field: { value, onChange, ...field } }) =>{
                    return (
                    <FormControlLabel
                        control={<Checkbox checked={value} onChange={(event, data) => onChange(data)}/>}
                        label={'Track stock quantity for this product'}
                    />
                    )
                }}
                />
                </Box>
            </Box>


            {/* Sold individuality */}
            {/* Limit purchases to 1 item per order */}

            {
                getValues('stock_management') ? (
                    <>
                    
                    <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <MyFormControl label='Quantity'>
                            <TextField type='number' fullWidth size='small' {...register('quantity')} />
                        </MyFormControl>
                    </Box>
                    <Box mt={3} display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                        <Controller
                        control={control}
                        name='backorder'
                        render={({ field: { value, onChange, ...field } }) => {
                            return <MyFormControl label='Backorder options'>
                                <SimpleRadio 
                                    value={value}
                                    onChange={(event: any, data: string) => {
                                        onChange(data)
                                    }}
                                    options={[
                                        {value: 'not_allow', label: 'Do not allow'},
                                        {value: 'notify', label: 'Allow, but notify customer'},
                                        {value: 'allow', label: 'Allow'},
                                    ]}
                                    label={null}
                                />
                            </MyFormControl>
                        }}
                        />
                    </Box>
                    </>

                ) : (
                    <Box mt={3} display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                    <Controller
                    control={control}
                    name={'stock_status'}
                    // rules={{ required: "Recipe picture is required" }}
                    render={({ field: { value, onChange, ...field } }) => {
                        return <MyFormControl label='Stock status'>
                        <SimpleRadio 
                            value={value}
                            onChange={(event: any, data: string) => {
                                onChange(data)
                            }}
                            options={[
                                {value: 'in_stock', label: 'in stock'},
                                {value: 'out_of_stock', label: 'out of stock'},
                                {value: 'on_backorder', label: 'on backorder'},
                            ]}
                            label={null}
                        />
                    </MyFormControl>
                    }}
                    />
                </Box>
                )
            }




            <Box mt={3}>
                <Box display={'flex'} alignItems={'center'}>
                <InputLabel sx={{width: 200}}>Sold individually</InputLabel>
                <Controller
                name='sold_individually'
                control={control}
                // rules={}
                render={({ field: { value, onChange, ...field } }) =>{
                    return (
                    <FormControlLabel
                        control={<Checkbox checked={value} onChange={(event, data) => onChange(data)}/>}
                        label={'Limit purchases to 1 item per order'}
                    />
                    )
                }}
                />
                </Box>
            </Box>


            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Initial number in stock'>
                    <TextField fullWidth size='small' {...register('stock')}/>
                </MyFormControl>
            </Box>
            

            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Unit of measurement'>
                    <TextField fullWidth size='small' {...register('unit')}/>
                </MyFormControl>
            </Box>

        </Box>
    )
}

export default ProductInventory
