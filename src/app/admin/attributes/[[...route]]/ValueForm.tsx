"use client"
import React, { useState, useTransition } from 'react'

import { admin_drawer_value, admin_snackbar } from '@/Atoms'
import { useAtom, useSetAtom } from 'jotai'
import { Box, Button, FormHelperText, Stack, TextField } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createValue, updateValue } from '@/api/admin/attributes/attributeAPI'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UploadInputWithChange from '@/components/admin/UploadInputWithChange'
import { Controller, useForm } from 'react-hook-form'

// import { updateAttribute } from '@/app/admin/attributes/actions'
type FormValue = {
    id: number | undefined,
    title: string,
    slug: string,
    color: string,
    attribute: number | undefined,
    image: any

}

const ValueForm = () => {
    // useHydrateAtoms([[admin_drawer_attribue, attribute] as const ])
    const [value, setValue] = useAtom(admin_drawer_value)
    const setSnackbar = useSetAtom(admin_snackbar)
    
    const {register, control, handleSubmit, watch} = useForm<FormValue>({
        defaultValues:{
            id: value.id,
            title: value.title,
            slug: value.slug,
            color: value.color,
            image: value.image,
            attribute: value.attribute
        }
    })

    const image = watch('image')
    

    const queryClient = useQueryClient()
    const valueMutation = useMutation({
        mutationFn: (data: any) => value.id ?  updateValue(data): createValue(data),
        onSuccess: (res) => {
            queryClient.invalidateQueries({queryKey: ['admin-attributes']})
            
            if (value.id) {
                queryClient.invalidateQueries({queryKey:['admin-attributes', value.id]})
            }
            setSnackbar({
                state: true,
                message: value.id ?  "Value Updated" : "Value Created"
            })
        },
    })

    if (valueMutation.isError){
        throw new Error(valueMutation.error.message)
    }
    
    const handleClick = (data: FormValue | any) => {
        // console.log(value)
        const form_data = new FormData()

        for ( let key in data ) {
            if (key == 'image' && (typeof data[key] == 'string' || data[key] == null)){
                continue
            }
                
            form_data.append(key, data[key]);
        }
        console.log(form_data)
        valueMutation.mutate(form_data)
                
    }


    return (
        <Box p={4} alignItems={'unset'}>
            <form onSubmit={handleSubmit(handleClick)}>
            <Stack>
                <Box>
                    <TextField fullWidth helperText={'Title for the value (shown on the front-end).'} label={'Title'} size='small' 
                    {...register('title')} />
                </Box>
                <Box mt={4}>
                    <TextField fullWidth helperText={"Unique slug for the value; must be no more than 28 characters."} label={'Slug'} size='small' 
                    {...register('slug')} />
                </Box>

                <Box mt={3}>
                    <FormHelperText sx={{ml: 0}}>Image swatch</FormHelperText>
                    <Box display={'flex'} alignItems={'center'} mt={1}>
                        <Controller
                        control={control}
                        name='image'
                        // rules={}
                        render={({ field: { value, onChange, ...field } }) => {
                            return (
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="outlined"
                                    sx={{textTransform: 'unset'}}
                                    tabIndex={-1}
                                    color='inherit'
                                    startIcon={<CloudUploadIcon />}
                                    >
                                    Upload
                                    <UploadInputWithChange onChange={(event: any) => onChange(event.target.files[0]) } />
                                </Button>
                            )
                        }}
                        />
                        {image && <Box ml={1} component={'img'} height={35} width={'auto'} 
                        src={ typeof image == 'string' ? image : URL.createObjectURL(image)}/>}
                    </Box>
                </Box>

                {value?.type == 'color' && <Box mt={3}>
                    <input {...register('color')} type='color'/>
                </Box>
                }

                <Box mt={3}>
                    <Button type='submit' size='small' variant='contained' sx={{textTransform: 'none', bgcolor: 'common.black', borderRadius: 8, px:4, '&:hover':{ bgcolor: 'grey.900'},  }}>
                        {value?.id ? <>Update</> : <>Create</> }
                    </Button>
                </Box>

            </Stack>
            </form>
        </Box>
    )
}

export default ValueForm
