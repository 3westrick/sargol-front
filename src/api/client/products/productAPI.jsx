"use server"
import { auth } from '@/lib/auth'
import ClientAxios from "../ClientAxios"

export async function getProducts(search,page, field, order, queries) {
    // const session = await auth()
    return await ClientAxios.get(`products/?search=${search}&ordering=${order}${field}&page=${page}`,{
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
