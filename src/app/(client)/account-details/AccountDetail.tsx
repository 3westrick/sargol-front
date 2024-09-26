"use client"
import { editProfile, getProfile } from '@/api/client/account/accountApi'
import { Box, Button, TextField } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'

type FormValue = {
    first_name: string,
    last_name: string,
    
    country: string,
    city: string,
    address: string,
    postcode: string,

    phone: string,
    username : string,
    password : string,
    email : string,
}

const AccountDetail = () => {
    const {data: user} = useQuery({
        queryKey: ['profile'],
        queryFn: () => getProfile()
    })

    const methods = useForm<FormValue>({
        defaultValues: {
            first_name : user?.first_name,
            last_name : user?.last_name,

            country: user?.country,
            city: user?.city,
            address: user?.address,
            postcode: user?.postcode,

            phone : user?.phone,
            username : user?.username,
            password : '',
            email : user?.email,
        }
    })

    const {handleSubmit, register} = methods

    const edit_user = useMutation({
        mutationFn:(data: FormValue) => editProfile(data),
        onSuccess: (res) => {
            console.log({res})
        },
        onError:(error: Error, variables: FormValue, context: unknown) => {
            console.log({error})
        },
    })

    function handle_submit(data: FormValue){
        edit_user.mutate(data)
    }
    return (
        <Box>
            <form onSubmit={handleSubmit(handle_submit)}>

            <Box>
                <TextField fullWidth {...register('username')} label={'Username'}/>
            </Box>

            <Box mt={3}>
                <TextField fullWidth {...register('first_name')} label={'First name'}/>
            </Box>

            <Box mt={3}>
                <TextField fullWidth {...register('last_name')} label={'Last name'}/>
            </Box>

            <Box mt={3}>
                <TextField fullWidth {...register('phone')} label={'Phone'}/>
            </Box>

            <Box mt={3}>
                <TextField fullWidth {...register('country')} label={'Country'}/>
            </Box>
            <Box mt={3}>
                <TextField fullWidth {...register('city')} label={'City'}/>
            </Box>
            <Box mt={3}>
                <TextField fullWidth {...register('address')} label={'Address'}/>
            </Box>
            <Box mt={3}>
                <TextField fullWidth {...register('postcode')} label={'Post code'}/>
            </Box>

            <Box mt={3}>
                <TextField type='password' fullWidth {...register('password')} label={'Password'}/>
            </Box>

            <Box mt={3}>
                <TextField type='email' fullWidth {...register('email')} label={'Email'}/>
            </Box>

            <Box mt={3}>
                <Button type='submit' variant='contained'>
                    Submit
                </Button>
            </Box>

            </form>
        </Box>
    )
}

export default AccountDetail
