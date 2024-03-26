"use client"
import { createUser } from '@/api/admin/users/userAPI'
import { Box, Button } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import UserForm from './UserForm'

type FormValue = {
    username : string,
    password : string,
    email : string,
    is_staff: boolean,
    user_permissions: [],
    groups: []
}

const UserCreate = () => {
    const methods = useForm<FormValue>({
        defaultValues: {
            username : '',
            password : '',
            email : '',
            user_permissions: [],
            groups: [],
            is_staff: false
        }
    })
    const {handleSubmit} = methods

    const create_user = useMutation({
        mutationFn:(data: FormValue) => {
            return createUser(data)
        },
        onSuccess: (res) => {
            console.log({res})
        },
        onError:(error: Error, variables: FormValue, context: unknown) => {
            console.log({error})
        }
    })

    function handle_submit(data: FormValue){
        // console.log(data)
        create_user.mutate(data)
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

export default UserCreate
