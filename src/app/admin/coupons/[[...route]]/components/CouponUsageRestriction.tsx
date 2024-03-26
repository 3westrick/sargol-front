import MyFormControl from '@/components/admin/MyFormControl'
import { Box, Checkbox, Divider, FormControlLabel, InputLabel, TextField } from '@mui/material'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import CouponCategorySelect from './CouponCategorySelect'
import CouponExcludeCategorySelect from './CouponExcludeCategorySelect'
import CouponProductSelect from './CouponProductSelect'
import CouponExcludeProductSelect from './CouponExcludeProductSelect'
import CouponAllowedEmails from './CouponAllowedEmails'
const CouponUsageRestriction = () => {
    const {register, control} = useFormContext()
    return (
        <Box>

            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Minimum spend'>
                    <TextField type='number' {...register('minimum')} fullWidth size='small' placeholder='No minimum' />
                </MyFormControl>
            </Box>

            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='maximum spend'>
                    <TextField type='number' {...register('maximum')} fullWidth size='small' placeholder='No maximum' />
                </MyFormControl>
            </Box>

            <Box mt={3}>
                <Box display={'flex'} alignItems={'center'}>
                <InputLabel sx={{width: 200}}>Individually use only</InputLabel>
                <Controller
                name='individual_use'
                control={control}
                // rules={}
                render={({ field: { value, onChange, ...field } }) =>{
                    return (
                    <FormControlLabel
                        control={<Checkbox checked={value} onChange={(event, data) => onChange(data)}/>}
                        label={'Tick this box if the coupon cannot be used in conjunction with other coupons.'}
                    />
                    )
                }}
                />
                </Box>
            </Box>

            <Box mt={3}>
                <Box display={'flex'} alignItems={'center'}>
                <InputLabel sx={{width: 200}}>Exclude sale items</InputLabel>
                <Controller
                name='exclude_sale_items'
                control={control}
                // rules={}
                render={({ field: { value, onChange, ...field } }) =>{
                    return (
                    <FormControlLabel
                        control={<Checkbox checked={value} onChange={(event, data) => onChange(data)}/>}
                        label={'Tick this box if the coupon should not apply to items on sale.'}
                    />
                    )
                }}
                />
                </Box>
            </Box>

            <Divider sx={{mt:3}}/>

            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Products'>
                <CouponProductSelect/>
                </MyFormControl>
            </Box>

            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Exclude products'>
                <CouponExcludeProductSelect/>
                </MyFormControl>
            </Box>

            <Divider sx={{mt:3}}/>

            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Product categories'>
                <CouponCategorySelect/>
                </MyFormControl>
            </Box>


            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Exclude categories'>
                <CouponExcludeCategorySelect/>
                </MyFormControl>
            </Box>

            <Divider sx={{mt:3}}/>

            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Allowed emails'>
                <CouponAllowedEmails/>
                </MyFormControl>
            </Box>

        </Box>
    )
}

export default CouponUsageRestriction
