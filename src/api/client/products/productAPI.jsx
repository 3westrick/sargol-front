"use server"
import { auth } from '@/lib/auth'
import ClientAxios from "../ClientAxios"

export async function getProducts(data, field, order, limit, offset) {
    // const session = await auth()
    return await ClientAxios.get(`products/?search=${data}&ordering=${order}${field}&limit=${limit}&offset=${offset}`,{
        headers: {
            // 'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}

export async function getProductWithSlug(slug){
    // const session = await auth()
    return await ClientAxios.get(`products/${slug}`,{
        headers: {
            // 'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}

export async function getProductWithId(id) {
    const session = await auth()
    return await ClientAxios.get(`products/${id}`,{
        headers: {
            // 'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}
