"use client"
import { createUser, editUser, getUser } from '@/api/admin/users/userAPI'
import { Box, Button } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import UserForm from './UserForm'
import { notFound } from 'next/navigation'

type FormValue = {
    username : string,
    password : string,
    email : string,
    is_staff: boolean,
    user_permissions: [],
    groups: []
}

const UserEdit = ({userId}: {userId: number}) => {

    const {data: user, status} = useQuery({
        queryKey: ['admin-users', userId],
        queryFn: () => getUser(userId),
    })

    if (!user) notFound()


    const methods = useForm<FormValue>({
        defaultValues: {
            username : user.username,
            password : '',
            email : user.email,
            user_permissions: user.user_permissions,
            groups: user.groups,
            is_staff: user.is_staff
        }
    })
    const {handleSubmit} = methods

    const edit_user = useMutation({
        mutationFn:(data: FormValue) => editUser(userId,data),
        onSuccess: (res) => {
            console.log({res})
        },
        onError:(error: Error, variables: FormValue, context: unknown) => {
            console.log({error})
        },
    })

    function handle_submit(data: FormValue){
        console.log(data)
        edit_user.mutate(data)
    }

    return (
        <Box>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(handle_submit)}>
                    <UserForm/>
                    <Button type='submit'>
                        Submit
                    </Button>
                </form>
            </FormProvider>
            
        </Box>
    )
}

export default UserEdit
