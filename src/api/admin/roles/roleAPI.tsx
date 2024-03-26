"use server"
import { auth } from '@/lib/auth'
import AxiosAdmin from "../AdminAxios"


export async function getPermissions() {
    const session = await auth()
    return await AxiosAdmin.get(`permissions/`,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}

export async function getRoles() {
    const session = await auth()
    return await AxiosAdmin.get(`groups/`,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}

export async function getRolesList(query:string, field:string, order:string, limit: number, offset: number) {
    const session = await auth()
    return await AxiosAdmin.get(`groups/list/?limit=${limit}&offset=${offset}&search=${query}&ordering=${order}${field}`,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}
export async function getRole(roleId: number) {
    const session = await auth()
    return await AxiosAdmin.get(`groups/${roleId}/`,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}

export async function createRole(data: any) {
    const session = await auth()
    return await AxiosAdmin.post(`groups/create/`,data,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}

export async function editRole(roleId: number ,data: any) {
    const session = await auth()
    return await AxiosAdmin.put(`groups/edit/${roleId}/`,data,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}
