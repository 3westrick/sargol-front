"use server"
import { auth } from '@/lib/auth'
import ClientAxios from './ClientAxios'
import { cookies } from 'next/headers'

export async function getShippingOptions() {
    return await ClientAxios.get(`options/shippings/`).then(response => response.data)
    .catch(error => {
        throw error
    })
}

export async function getTaxesOptions() {
    return await ClientAxios.get(`options/taxes/`).then(response => response.data)
    .catch(error => {
        throw error
    })
}


export async function getGeneralOptions() {
    return await ClientAxios.get(`options/generals/`).then(response => response.data)
    .catch(error => {
        throw error
    })
}

export async function checkShipping(data:any) {
    // const cookieStore = cookies()
    // cookieStore.set({
    //     name: 'name',
    //     value: 'lee',
    //     httpOnly: true,
    // })
    const session = await auth()
    if (session){
        return await ClientAxios.post(`shippings/check/`, data,{
            headers: {
                'Authorization': `Bearer ${session?.user.access}`
            }
        }).then(response => response.data)
        .catch(error => {
            throw error
        })
    }
    return await ClientAxios.post(`shippings/check/`, data,)
    .then(response => response.data)
    .catch(error => {
        throw error
    })


}