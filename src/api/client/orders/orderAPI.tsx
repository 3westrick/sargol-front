"use server"
import { auth } from '@/lib/auth'
import AxiosClient from "../ClientAxios"
type Category = {
    id: number | undefined | null,
    title: string | undefined | null,
    slug: string | undefined | null,
    parent: number | undefined | null,
}

export async function getAtt(page: number) {
    const session = await auth()
    return await AxiosClient.get(`attributes/?page=${page}`,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}




export async function getOrders(page: number) {
    const session = await auth()
    return await AxiosClient.get(`orders/?page=${page}`,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}


export async function getOrder(orderId: number) {
    const session = await auth()
    return await AxiosClient.get(`orders/${orderId}/`,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}


export async function getItems() {
    const session = await auth()
    return await AxiosClient.get('orders/items/',{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}


export async function createItem(item:any) {
    const session = await auth()
    return await AxiosClient.post(`orders/items/create/`,item,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        console.log(error.response)
        throw error
    })
}

export async function updateItem(item:any) {
    const session = await auth()
    return await AxiosClient.put(`orders/items/edit/${item.id}/`,item,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}

export async function deleteItem(itemId:string) {
    const session = await auth()
    return await AxiosClient.delete(`orders/items/delete/${itemId}/`,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}

export async function verifyCoupon(data:any) {
    const session = await auth()
    const res =  await AxiosClient.post(`coupons/${data.title}/`,data.coupons,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        return {error: error.response.data}
    })
    return res
} 
export async function verifyCoupons(data:any) {
    const session = await auth()
    const res =  await AxiosClient.post(`coupons/verify/`,data,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        return {error: error.response.data}
    })
    return res
} 


export async function purchase(data:any) {
    const session = await auth()
    const res =  await AxiosClient.post(`orders/purchase/`,data,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        return {error: error.response.data}
    })
    return res
}