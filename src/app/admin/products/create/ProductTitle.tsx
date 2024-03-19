import { Box, TextField } from '@mui/material'
import React from 'react'
import { useFormContext } from 'react-hook-form'

const ProductTitle = () => {
    const methods = useFormContext()
    const {register} = methods
    
  return (
    <Box>
        <TextField {...register('title')} fullWidth size='small' label={'Title'} name='title' />
    </Box>
  )
}

export default ProductTitle
