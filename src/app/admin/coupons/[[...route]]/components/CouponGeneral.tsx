import DiscountTypeSelect from '@/components/admin/DiscountTypeSelect'
import MyFormControl from '@/components/admin/MyFormControl'
import { Box, Checkbox, FormControlLabel, InputLabel, TextField } from '@mui/material'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

const CouponGeneral = () => {
    const {register, control} = useFormContext()
    return (
        <Box>
            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Discount Type'>
                    <DiscountTypeSelect label={'type'}/>
                </MyFormControl>
            </Box>
            
            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Coupon Amount'>
                    <TextField type='number' {...register('amount')} fullWidth size='small' />
                </MyFormControl>
            </Box>

            <Box mt={3}>
                <Box display={'flex'} alignItems={'center'}>
                <InputLabel sx={{width: 200}}>Sold individually</InputLabel>
                <Controller
                name='free_shipping'
                control={control}
                // rules={}
                render={({ field: { value, onChange, ...field } }) =>{
                    return (
                    <FormControlLabel
                        control={<Checkbox checked={value} onChange={(event, data) => onChange(data)}/>}
                        label={'Tick this box if the coupon grants free shipping'}
                    />
                    )
                }}
                />
                </Box>
            </Box>


            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Coupon expire date'>
                    <TextField type='date' {...register('expired_at')} fullWidth size='small' />
                </MyFormControl>
            </Box>

        </Box>
    )
}

export default CouponGeneral
