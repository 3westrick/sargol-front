"use server"
import { auth } from '@/lib/auth'
import AxiosAdmin from "./AdminAxios"
type Category = {
    id: number | undefined | null,
    title: string | undefined | null,
    slug: string | undefined | null,
    parent: number | undefined | null,
}

export async function getTaxes(query:string, field:string, order:string, limit: number, offset: number) {
    const session = await auth()
    return await AxiosAdmin.get(`taxes/?limit=${limit}&offset=${offset}&search=${query}&ordering=${order}${field}`,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}

export async function getAllTaxes() {
    const session = await auth()
    return await AxiosAdmin.get(`taxes/all/`,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}

export async function getTax(taxId: number) {
    const session = await auth()
    return await AxiosAdmin.get(`taxes/${taxId}/`,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}

export async function getRates(taxId: number) {
    const session = await auth()
    return await AxiosAdmin.get(`taxes/rates/?tax__id=${taxId}`,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}



export async function createTax(tax:any) {
    const session = await auth()
    return await AxiosAdmin.post(`taxes/create/`,tax,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        console.log(error.response)
        throw error
    })
}

export async function updateTax(tax:any) {
    const session = await auth()
    return await AxiosAdmin.put(`taxes/edit/${tax.id}/`,tax,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        console.log(error.response)
        throw error
    })
}

export async function deleteTax(tax:any) {
    const session = await auth()
    return await AxiosAdmin.delete(`taxes/edit/${tax.id}/`,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        console.log(error.response)
        throw error
    })
}



export async function createRate(rate:any) {
    const session = await auth()
    return await AxiosAdmin.post(`taxes/rates/create/`,rate,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        console.log(error.response)
        throw error
    })
}

export async function updateRate(rate:any) {
    const session = await auth()
    return await AxiosAdmin.put(`taxes/rates/edit/${rate.id}/`,rate,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        console.log(error.response)
        throw error
    })
}

export async function deleteRate(tax:any) {
    const session = await auth()
    return await AxiosAdmin.delete(`taxes/delete/${tax.id}/`,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        console.log(error.response)
        throw error
    })
}

