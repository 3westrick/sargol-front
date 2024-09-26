"use server"
import { auth } from '@/lib/auth'
import ClientAxios from "../ClientAxios"

export async function getProducts(search,page, queries) {
    // const session = await auth()
    
    const query = `page=${page}&search=${search}&values__slug__in=${queries.values}&categories__slug__in=${queries.categories}&regular_price__gte=${queries.price_gte}&regular_price__lte=${queries.price_lte}&rating__gte=${queries.rating_gte}`
    return await ClientAxios.get(`products/?${query}`,{
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

export async function getProductWithIds(ids) {
    return await ClientAxios.get(`products/basket/?id__in=${ids}`).then(response => response.data)
    .catch(error => {
        throw error
    })
}
