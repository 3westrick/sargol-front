"use server"
import { auth } from '@/lib/auth'
import AxiosAdmin from "../AdminAxios"


export async function getUsers(query:string, field:string, order:string, limit: number, offset: number) {
    const session = await auth()
    return await AxiosAdmin.get(`users/?limit=${limit}&offset=${offset}&search=${query}&ordering=${order}${field}`,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}

export async function getUser(userId: number) {
    const session = await auth()
    return await AxiosAdmin.get(`users/${userId}/`,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        console.log(error)
        throw error
    })
}

export async function createUser(data:any) {
    const session = await auth()
    return await AxiosAdmin.post(`users/create/`,data,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}


export async function editUser(userId: number, data:any) {
    const session = await auth()
    return await AxiosAdmin.put(`users/edit/${userId}/`,data,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}