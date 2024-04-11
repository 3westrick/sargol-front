import { Box, Button, TextField } from '@mui/material'
import React from 'react'
import { useFormContext } from 'react-hook-form'

const ProductAddQuantity = ({single}: {single: boolean}) => {
    const methods = useFormContext()
    const {register, setValue, getValues} = methods

    function increase() {
        const value = parseInt(getValues('quantity'))
        setValue('quantity', value + 1)
    }
    

    function decrease() {
        const value = parseInt(getValues('quantity'))
        if (value > 0){
            setValue('quantity', value - 1)
        }   
    }
    return (
        <Box>
            <TextField type='number' {...register('quantity')}/>
            <Box>
                {!single && 
                <>
                <Button variant='outlined' onClick={decrease}>
                    -
                </Button>
                <Button variant='outlined' onClick={increase}>
                    +
                </Button>
                </>
                
                }
            </Box>
        </Box>
    )
}

export default ProductAddQuantity
