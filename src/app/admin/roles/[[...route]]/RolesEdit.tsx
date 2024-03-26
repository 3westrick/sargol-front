"use client"
import { editRole, getRole } from '@/api/admin/roles/roleAPI'
import { Box, Button } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import RoleForm from './RoleForm'

type FormValue = {
    name: string,
    permissions: any[]
}

const RolesEdit = ({roleId} : {
    roleId : number
}) => {

    const {data: role} = useQuery({
        queryKey: ['admin-product', roleId],
        queryFn: () => getRole(roleId),
    })

    const methods = useForm<FormValue>({
        defaultValues: {
            name: role.name,
            permissions: role.permissions
        }
    })

    const edit_role = useMutation({
        mutationFn: (data: FormValue) => editRole(roleId, data),
        onSuccess: (res) => {
            
        }
    })

    const {handleSubmit} = methods

    function submit_form(data: FormValue){
        // console.log(data)
        edit_role.mutate(data)
    }

    return (
        <Box>
            <FormProvider {...methods}>
            <form onSubmit={handleSubmit(submit_form)}>
                <RoleForm/>
                <Box mt={3}>
                    <Button type='submit' variant='contained'>
                        Submit
                    </Button>
                </Box>
            </form>
            </FormProvider>
        </Box>
    )
}

export default RolesEdit
