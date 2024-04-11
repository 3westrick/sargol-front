"use server"
import { auth } from '@/lib/auth'
import ClientAxios from "../ClientAxios"

export async function getCategories(page: number ,search: string) {
    // const session = await auth()
    return await ClientAxios.get(`categories/?page=${page}&search=${search}`,{
        headers: {
            // 'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}



export async function getCategory(slug: string, page: number, search: string) {
    const session = await auth()
    return await ClientAxios.get(`categories/${slug}/?page=${page}&search=${search}`,{
        headers: {
            // 'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}
