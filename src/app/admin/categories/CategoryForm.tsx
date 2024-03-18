"use client"
import React, { useState, useTransition } from 'react'

import { admin_drawer_category, admin_snackbar } from '@/Atoms'
import { useAtom, useSetAtom } from 'jotai'
import { Box, Button, Stack, TextField } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createCategory, getCategories, updateCategory } from '@/api/admin/categories/categoryAPI'
import CustomSelect from '@/components/admin/CustomSelect'
// import { updateAttribute } from '@/app/admin/attributes/actions'

const CategoryFrom = () => {
    const [category, setCategory] = useAtom(admin_drawer_category)
    const setSnackbar = useSetAtom(admin_snackbar)

    const categories = useQuery({
        queryKey: ['admin-categories'],
        queryFn: () => getCategories()
    })

    const queryClient = useQueryClient()
    const categoryMutation = useMutation({
        mutationFn: (data) => category.id ?  updateCategory(data): createCategory(data),
        onSuccess: (res) => {
            queryClient.invalidateQueries(['admin-categories'])
            setSnackbar({
                state: true,
                message: category.id ?  "Category Updated" : "Category Created"
            })
        },
    })

    if (categoryMutation.isError){
        throw new Error(categoryMutation.error.message)
    }
    
    const handleClick = () => {
        categoryMutation.mutate(category)        
    }
    return (
        <Box p={4} alignItems={'unset'}>
            <form action={handleClick}>
            <Stack>
                <Box>
                    <TextField fullWidth helperText={'Title for the category (shown on the front-end).'} label={'Title'} size='small' value={category?.title ?? ""} onChange={(e) => setCategory({...category, title: e.target.value }) } />
                </Box>
                <Box mt={4}>
                    <TextField fullWidth helperText={"Unique slug for the category; must be no more than 28 characters."} label={'Slug'} size='small' value={category?.slug ?? ""} onChange={(e) => setCategory({...category, slug: e.target.value }) } />
                </Box>
                <Box mt={4}>
                    <CustomSelect
                        label={'Parent'}
                        options={categories.data}
                        optionKey="id"
                        optionName="title"
                        optionValue="id"
                        value={category?.parent ?? ''}
                        setValue={(data) => setCategory({...category, parent: data})}
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
