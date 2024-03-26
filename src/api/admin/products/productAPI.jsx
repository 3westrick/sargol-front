"use server"
import { auth } from '@/lib/auth'
import AxiosAdmin from "../AdminAxios"

export async function getProducts(data, field, order, limit, offset) {
    // products/?search=a&limit=10&offset=0&ordering=id&shipping_class=a&sold_individually=true&stock_management=true&stock_status=a&tax_class=a&tax_status=a&unit__icontains=a
    const session = await auth()
    return await AxiosAdmin.get(`products/?search=${data}&ordering=${order}${field}&limit=${limit}&offset=${offset}`,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}

export async function editProduct(id, data){
    
    const session = await auth()
    return await AxiosAdmin.put(`products/edit/${id}/`,data,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`,
        }
    }).then(response => response.data)
    .catch(error => {
        console.log(error.response)
        throw error
    })

}

export async function getProductWithId(id) {
    const session = await auth()
    return await AxiosAdmin.get(`products/${id}`,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}

export async function createProduct(data) {
    const session = await auth()
    return await AxiosAdmin.post(`products/create/`,data,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`,
        }
    }).then(response => response.data)
    .catch(error => {
        console.log(error.response)
        throw error
    })
}

export async function createVariant(data) {
    const session = await auth()
    return await AxiosAdmin.post(`products/variant/create/`,data,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`,
        }
    }).then(response => response.data)
    .catch(error => {
        console.log(error.response)
        throw error
    })
}

export async function editVariant(data) {
    const session = await auth()
    return await AxiosAdmin.put(`products/variant/edit/${data.get('key_id')}/`,data,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`,
        }
    }).then(response => response.data)
    .catch(error => {
        console.log(error.response)
        throw error
    })
}