"use client"
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import {useForm} from 'react-hook-form'
import { createCustom } from './api'
const ImagePage = () => {
    const { handleSubmit, register } = useForm()

    const custom_mutation = useMutation({
        mutationFn: (data) => createCustom(data),
        onSuccess: (res) => {
            console.log(res)
        }
    })

    function submit_form(data: any){
        console.log(data)
        custom_mutation.mutate(data)
    }

    function action_submit(data: any){
        custom_mutation.mutate(data)
    }
    return (
        <div>
            <form onSubmit={handleSubmit(submit_form)}>
                <input {...register('title')} type='text'/><br/>
                <input {...register('image')} type='file'/><br/>
                <button type='submit'>Submit</button>
            </form>
            <hr/>
            <form action={action_submit}>
                <input name='title' type='text'/><br/>
                <input name='image' type='file'/><br/>
                <button type='submit'>Submit</button>
            </form>
            
        </div>
    )
}

export default ImagePage
