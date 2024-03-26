import MyFormControl from '@/components/admin/MyFormControl'
import { Box, TextField } from '@mui/material'
import React from 'react'
import { useFormContext } from 'react-hook-form'

const CouponUsageLimits = () => {
    const {register, control} = useFormContext()
    return (
        <Box>

            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Usage limit per coupon'>
                    <TextField placeholder='Unlimited usage' type='number' {...register('usage_limit')} fullWidth size='small' />
                </MyFormControl>
            </Box>


            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Limit usage to X items'>
                    <TextField placeholder='Apply to all quallifying items in basket' type='number' {...register('item_limit')} fullWidth size='small' />
                </MyFormControl>
            </Box>


            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Usage limit per person'>
                    <TextField placeholder='Unlimited usage' type='number' {...register('user_limit')} fullWidth size='small' />
                </MyFormControl>
            </Box>
            
        </Box>
    )
}

export default CouponUsageLimits
