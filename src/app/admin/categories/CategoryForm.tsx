"use client"
import React, { useState, useTransition } from 'react'

import { admin_drawer_category, admin_snackbar } from '@/Atoms'
import { useAtom, useSetAtom } from 'jotai'
import { Box, Button, FormControl, FormHelperText, FormLabel, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createCategory, getCategories, updateCategory } from '@/api/admin/categories/categoryAPI'
import CustomSelect from '@/components/admin/CustomSelect'
import SimpleSelect from '@/components/admin/SimpleSelect'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import CategorySelect from './components/CategorySelect'
import UploadInputWithChange from '@/components/admin/UploadInputWithChange'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

type FormValue = {
    id: number | undefined,
    title: string,
    slug: string,
    parent: number,

    image: any
}

const CategoryFrom = () => {
    const [category, setCategory] = useAtom(admin_drawer_category)
    const setSnackbar = useSetAtom(admin_snackbar)
    const methods  = useForm<FormValue>({
        defaultValues:{
            id: category.id,
            title: category.title,
            slug: category.slug,
            parent: category.parent,

            image: category.image,
        }
    })

    const {register, control, handleSubmit, watch} = methods
    const image = watch('image')
    // const categories = useQuery({
    //     queryKey: ['admin-categories'],
    //     queryFn: () => getCategories("","","",10,0)
    // })

    const queryClient = useQueryClient()
    const categoryMutation = useMutation({
        mutationFn: (data: any) => category.id ?  updateCategory(data): createCategory(data),
        onSuccess: (res) => {
            queryClient.invalidateQueries({queryKey: ['admin-categories']})
            setSnackbar({
                state: true,
                message: category.id ?  "Category Updated" : "Category Created"
            })
        },
    })

    if (categoryMutation.isError){
        throw new Error(categoryMutation.error.message)
    }
    
    const handleClick = (data: FormValue | any) => {
        // if(data.parent) data.parent = data.parent.id
        // categoryMutation.mutate(data)        

        const form_data = new FormData()
        if(data.parent) data.parent = data.parent.id
        for ( let key in data ) {
            if (key == 'image' && (typeof data[key] == 'string' || data[key] == null)){
                continue
            }
            if (key == 'parent' && data[key] == null){
                continue
            }
                
            form_data.append(key, data[key]);
        }
        categoryMutation.mutate(form_data)
    }
    return (
        <Box p={4} alignItems={'unset'}>
            <FormProvider {...methods}>
            <form onSubmit={handleSubmit(handleClick)}>
            <Stack>
                <Box>
                    <TextField fullWidth helperText={'Title for the category (shown on the front-end).'} label={'Title'} size='small' 
                    {...register('title')}/>
                </Box>
                <Box mt={3}>
                    <TextField fullWidth helperText={"Unique slug for the category; must be no more than 28 characters."}  label={'Slug'} size='small' 
                    {...register('slug')}/>
                </Box>
                <Box mt={3}>
                   <CategorySelect/>
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

                <Box mt={3}>
                    <Button type='submit' size='small' variant='contained' sx={{textTransform: 'none', bgcolor: 'common.black', borderRadius: 8, '&:hover':{ bgcolor: 'grey.900'} }}>
                        {category?.id ? <>Update</> : <>Create</> }
                    </Button>
                </Box>
            </Stack>
            </form>
            </FormProvider>
        </Box>
    )
}

export default CategoryFrom
