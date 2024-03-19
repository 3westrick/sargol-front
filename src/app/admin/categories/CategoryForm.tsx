"use client"
import React, { useState, useTransition } from 'react'

import { admin_drawer_category, admin_snackbar } from '@/Atoms'
import { useAtom, useSetAtom } from 'jotai'
import { Box, Button, FormControl, FormLabel, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createCategory, getCategories, updateCategory } from '@/api/admin/categories/categoryAPI'
import CustomSelect from '@/components/admin/CustomSelect'
import SimpleSelect from '@/components/admin/SimpleSelect'
import { Controller, useForm } from 'react-hook-form'
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
    const {register, control, handleSubmit} = useForm<FormValue>({
        defaultValues:{
            id: category.id,
            title: category.title,
            slug: category.slug,
            parent: category.parent ?? "none",
        }
    })

    const categories = useQuery({
        queryKey: ['admin-categories'],
        queryFn: () => getCategories()
    })

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
        if(data.parent == 'none') data.parent = null
        categoryMutation.mutate(data)        
    }
    return (
        <Box p={4} alignItems={'unset'}>
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
                    <Controller
                        control={control}
                        name={'parent'}
                        // rules={{ required: "Recipe picture is required" }}
                        render={({ field: { value, onChange, ...field } }) => {
                        return (
                            <FormControl fullWidth size="small">
                                <InputLabel id="demo-simple-select-label">Parent</InputLabel>
                                <Select
                                id="demo-simple-select-label"
                                label={'Parent'}
                                value={value}
                                onChange={(event)=> onChange(event.target.value)}
                                >
                                <MenuItem value={"none"}>None</MenuItem>
                                {categories.data.filter((opt:any, index:any) => {
                                    if (category.id){
                                        if(category.id != opt.id){
                                            return opt
                                        }
                                    }else{
                                        return opt
                                    }

                                }).map((opt:any) => <MenuItem key={opt.id} value={opt.id}>{opt.title}</MenuItem>)}
                                </Select>
                            </FormControl>
                            )
                        }
                    }
                    />
                </Box>

                <Box mt={3}>
                    <Button type='submit' size='small' variant='contained' sx={{textTransform: 'none', bgcolor: 'common.black', borderRadius: 8, '&:hover':{ bgcolor: 'grey.900'} }}>
                        {category?.id ? <>Update</> : <>Create</> }
                    </Button>
                </Box>
            </Stack>
            </form>
        </Box>
    )
}

export default CategoryFrom
