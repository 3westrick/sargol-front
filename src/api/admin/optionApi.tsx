"use server"
import { auth } from '@/lib/auth'
import AxiosAdmin from "./AdminAxios"

export async function getShippingOptions() {
    const session = await auth()
    return await AxiosAdmin.get(`options/shippings/`,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}

export async function getTaxesOptions() {
    const session = await auth()
    return await AxiosAdmin.get(`options/taxes/`,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}

export async function updateShippingOptions(data:any) {
    const session = await auth()
    return await AxiosAdmin.put(`options/shippings/edit/`,data,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        console.log(error.response)
        throw error
    })
}

export async function updateTaxesOptions(data:any) {
    const session = await auth()
    return await AxiosAdmin.put(`options/taxes/edit/`,data,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        console.log(error.response)
        throw error
    })
}



export async function getGeneralOptions() {
    const session = await auth()
    return await AxiosAdmin.get(`options/general/`,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}
export async function updateGeneralOptions(data:any) {
    const session = await auth()
    return await AxiosAdmin.put(`options/general/edit/`, data,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}

