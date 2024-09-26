import { Box, Button, TextField } from '@mui/material'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

const ProductAddQuantity = ({single}: {single: boolean}) => {
    const methods = useFormContext()
    const {register, setValue, getValues, control} = methods

    function increase() {
        const value = parseInt(getValues('quantity'))
        setValue('quantity', value + 1)
    }
    

    function decrease() {
        const value = parseInt(getValues('quantity'))
        if (value > 1){
            setValue('quantity', value - 1)
        }   
    }
    return (
        <Box>
            <Controller
            control={control}
            name='quantity'
            render={({field: {value, onChange}}) => {
                return <TextField type='number' value={value} onChange={(e) => {
                    const data = parseInt(e.target.value)
                    if (data > 0){
                        onChange(data)
                    }
                }}/>
            }}
            />
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
