"use server"
import { auth } from '@/lib/auth'
import AxiosAdmin from "./AdminAxios"
type Category = {
    id: number | undefined | null,
    title: string | undefined | null,
    slug: string | undefined | null,
    parent: number | undefined | null,
}

export async function getShippings(query:string, field:string, order:string, limit: number, offset: number) {
    const session = await auth()
    return await AxiosAdmin.get(`shippings/?limit=${limit}&offset=${offset}&search=${query}&ordering=${order}${field}`,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}

export async function getRegions() {
    const session = await auth()
    return await AxiosAdmin.get(`regions/`,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}


export async function getAllShippings() {
    const session = await auth()
    return await AxiosAdmin.get(`shippings/all/`,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}


export async function getShipping(shippingId: number) {
    const session = await auth()
    return await AxiosAdmin.get(`shippings/${shippingId}/`,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}



export async function createShipping(shipping:any) {
    const session = await auth()
    return await AxiosAdmin.post(`shippings/create/`,shipping,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        console.log(error.response)
        throw error
    })
}

export async function updateShipping(shipping:any) {
    const session = await auth()
    return await AxiosAdmin.put(`shippings/edit/${shipping.id}/`,shipping,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        console.log(error.response)
        throw error
    })
}

export async function deleteShipping(shipping:any) {
    const session = await auth()
    return await AxiosAdmin.delete(`shippings/delete/${shipping.id}/`,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        console.log(error.response)
        throw error
    })
}

export async function createShippingZone(shipping:any) {
    const session = await auth()
    return await AxiosAdmin.post(`shippings/zones/create/`,shipping,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        console.log(error.response)
        throw error
    })
}

export async function getZones() {
    const session = await auth()
    return await AxiosAdmin.get(`shippings/zones/`,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}

export async function getZone(id: any) {
    const session = await auth()
    return await AxiosAdmin.get(`shippings/zones/${id}/`,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}

export async function updateZone(id: any, data: any) {
    const session = await auth()
    return await AxiosAdmin.put(`shippings/zones/edit/${id}/`,data,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}