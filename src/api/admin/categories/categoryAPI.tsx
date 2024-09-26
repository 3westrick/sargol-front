"use server"
import { auth } from '@/lib/auth'
import AxiosAdmin from "../AdminAxios"


export async function getCategories(query:string, field:string, order:string, limit: number, offset: number) {
    const session = await auth()
    return await AxiosAdmin.get(`categories/?limit=${limit}&offset=${offset}&search=${query}&ordering=${order}${field}`,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}

export async function getCategoriesProduct() {
    const session = await auth()
    return await AxiosAdmin.get('categories/product/',{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}


export async function createCategory(category:FormData | any) {
    const session = await auth()
    return await AxiosAdmin.post(`categories/create/`,category,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        console.log(error.response)
        throw error
    })
}

export async function updateCategory(category:any) {
    const session = await auth()
    return await AxiosAdmin.put(`categories/edit/${category.get('id')}/`,category,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        console.log(error.response)
        throw error
    })
}
