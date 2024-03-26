"use client"
import React, { useState, useTransition } from 'react'

import { admin_drawer_attribue, admin_snackbar } from '@/Atoms'
import { useAtom, useSetAtom } from 'jotai'
import { Box, Button, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, Stack, TextField } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAttribute, updateAttribute } from '@/api/admin/attributes/attributeAPI'
import { Controller, useForm } from 'react-hook-form'

type FormValue = {
    id: number | undefined,
    title: string,
    slug: string,
    type: string,
}

const AttributeForm = () => {
    const [attribute, setAsttirbute] = useAtom(admin_drawer_attribue)
    const setSnackbar = useSetAtom(admin_snackbar)
    
    const {register, control, handleSubmit} = useForm<FormValue>({
        defaultValues:{
            id: attribute.id,
            title: attribute.title,
            slug: attribute.slug,
            type: attribute.type,
        }
    })

    const queryClient = useQueryClient()
    const attributeMutation = useMutation({
        mutationFn: (data) => attribute?.id ?  updateAttribute(data): createAttribute(data),
        onSuccess: (res) => {
            queryClient.invalidateQueries({
                queryKey: ['admin-attributes'],
            })
            setSnackbar({
                state: true,
                message: attribute?.id ?  "Attribute Updated" : "Attribute Created"
            })
        },
    })

    if (attributeMutation.isError){
        throw new Error(attributeMutation.error.message)
    }
    
    const handleClick = (data: any) => {
        attributeMutation.mutate(data)        
    }
    return (
        <Box p={4} alignItems={'unset'}>
            <form onSubmit={handleSubmit(handleClick)}>
            <Stack>
                <Box>
                    <TextField fullWidth helperText={'Title for the attribute (shown on the front-end).'} label={'Title'} size='small' 
                     {...register('title')}/>
                </Box>
                <Box mt={4}>
                    <TextField fullWidth helperText={"Unique slug for the attribute; must be no more than 28 characters."} label={'Slug'} size='small' 
                    {...register('slug')}/>
                </Box>

                <Box mt={3}>
                    <Controller
                    control={control}
                    name={'type'}
                    // rules={}
                    render={({ field: { value, onChange, ...field } }) => {
                        return (
                            <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Type</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-radio-buttons-group-label"
                                value={value}
                                onChange={(event, data) => onChange(data)}
                            >
                                <FormControlLabel sx={{ml:3}} value="color" control={<Radio size='small'/>} label="Color" />
                                <FormControlLabel sx={{ml:3}} value="normal" control={<Radio size='small'/>} label="Normal" />
                            </RadioGroup>
                            <FormHelperText sx={{ml: 0}}>Color type will be displayed as swatch style</FormHelperText>
                            </FormControl>
                        )
                    }}

                    />
                </Box>

                <Box mt={3}>
                    <Button type='submit' variant='contained' sx={{textTransform: 'none', bgcolor: 'common.black', borderRadius: 8, '&:hover':{ bgcolor: 'grey.900'} }}>
                        {attribute?.id ? <>Update</> : <>Create</> }
                    </Button>
                </Box>

  
            </Stack>
            </form>
        </Box>
    )
}

export default AttributeForm
