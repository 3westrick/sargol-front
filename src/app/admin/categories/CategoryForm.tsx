"use client"
import React, { useState, useTransition } from 'react'

import { admin_drawer_category, admin_snackbar } from '@/Atoms'
import { useAtom, useSetAtom } from 'jotai'
import { Box, Button, FormControl, FormLabel, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createCategory, getCategories, updateCategory } from '@/api/admin/categories/categoryAPI'
import CustomSelect from '@/components/admin/CustomSelect'
import SimpleSelect from '@/components/admin/SimpleSelect'
import { FormProvider, useForm } from 'react-hook-form'
import CategorySelect from './components/CategorySelect'
// import { updateAttribute } from '@/app/admin/attributes/actions'

type FormValue = {
    id: number | undefined,
    title: string,
    slug: string,
    parent: number,
}

const CategoryFrom = () => {
    const [category, setCategory] = useAtom(admin_drawer_category)
    const setSnackbar = useSetAtom(admin_snackbar)
    const methods  = useForm<FormValue>({
        defaultValues:{
            id: category.id,
            title: category.title,
            slug: category.slug,
            parent: category.parent ,
        }
    })

    const {register, control, handleSubmit} = methods

    // const categories = useQuery({
    //     queryKey: ['admin-categories'],
    //     queryFn: () => getCategories("","","",10,0)
    // })

    const queryClient = useQueryClient()
    const categoryMutation = useMutation({
        mutationFn: (data) => category.id ?  updateCategory(data): createCategory(data),
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
        if(data.parent) data.parent = data.parent.id
        categoryMutation.mutate(data)        
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
                <Box mt={4}>
                    <TextField fullWidth helperText={"Unique slug for the category; must be no more than 28 characters."}  label={'Slug'} size='small' 
                    {...register('slug')}/>
                </Box>
                <Box mt={4}>
                   <CategorySelect/>
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
