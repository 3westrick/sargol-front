import { Box, Paper, TextField, Typography } from '@mui/material'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import CouponData from './CouponData'
import { debounce } from '@mui/material/utils';
import CouponCategorySelect from './CouponCategorySelect';

const CouponForm = () => {
    const methods = useFormContext()
    const {register} = methods

    return (
        <Box>

            <Box>
                <TextField {...register('title')} fullWidth size='small' label={'Title'}/>
            </Box>


            {/* <Box mt={3}>
            <TextField onChange={debounce((e) => {
              console.log(e.target.value)
            }, 1000)}/>
            </Box> */}


            <Box mt={3}>
              <TextField {...register('description')} multiline minRows={3} fullWidth size='small' label={'Coupon description'} />
            </Box>

            <Box mt={3}>
              <Typography>
                Coupon Data
              </Typography>

              <Box mt={3}>
                <Paper elevation={4}>
                  <Box>
                    <CouponData/>
                  </Box>
                </Paper>
              </Box>

            </Box>
            
        </Box>
  )
}

export default CouponForm
