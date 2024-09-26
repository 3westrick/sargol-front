"use server"
import { auth } from '@/lib/auth'
import AxiosAdmin from "../AdminAxios"
type Attribute = {
    id: number | undefined | null,
    title: string | undefined | null,
    slug: string | undefined | null
}

type Value = {
    id: number | undefined | null,
    title: string | undefined | null,
    slug: string | undefined | null,
    attribute: number | undefined | null,
    image: any,
}

export async function getAttributes(query:string, field:string, order:string, limit: number, offset: number) {
    const session = await auth()
    return await AxiosAdmin.get(`attributes/?limit=${limit}&offset=${offset}&search=${query}&ordering=${order}${field}`,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}


export async function getAllAttributes() {
    const session = await auth()
    return await AxiosAdmin.get(`attributes/all/`,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}

export async function getAttribute(attributeID: number) {
    const session = await auth()
    return await AxiosAdmin.get(`attributes/${attributeID}/`,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}


export async function getValues(attributeID: number, query:string, field:string, order:string, limit: number, offset: number) {
    const session = await auth()
    return await AxiosAdmin.get(`values/?attribute__id=${attributeID}&limit=${limit}&offset=${offset}&search=${query}&ordering=${order}${field}`,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}

export async function createAttribute(attribute:any) {
    const session = await auth()
    const res =  await AxiosAdmin.post(`attributes/create/`,{
        title: attribute.title,
        slug: attribute.slug,
        type: attribute.type,
    },{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => ({success: response.data}))
    .catch(error => {
        return {error: error.response.data}
    })
    return res
}

export async function updateAttribute(attribute:any) {
    const session = await auth()
    return await AxiosAdmin.put(`attributes/edit/${attribute.id}/`,{
        title: attribute.title,
        slug: attribute.slug,
        type: attribute.type,
    },{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        console.log(error.response)
        throw error
    })
}


export async function createValue(data:FormData | any) {
    const session = await auth()
    return await AxiosAdmin.post(`values/create/`,data,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        console.log(error.response)
        throw error
    })
}

export async function updateValue(data:FormData| any) {
    // console.log(data)
    // return null
    const session = await auth()
    
    return await AxiosAdmin.put(`values/edit/${data.get('id')}/`,data,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`,
        }
    }).then(response => response.data)
    .catch(error => {
        console.log(error.response)
        throw error
    })
}