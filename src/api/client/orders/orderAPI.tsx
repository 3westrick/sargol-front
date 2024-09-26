"use server"
import { auth } from '@/lib/auth'
import AxiosClient from "../ClientAxios"
import { cookies } from 'next/headers'
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
    if(session){
        return await AxiosClient.get('orders/items/',{
            headers: {
                'Authorization': `Bearer ${session?.user.access}`
            }
        }).then(response => response.data)
        .catch(error => {
            throw error
        })
    }
    return false
}


export async function createItem(item:any) {
    const session = await auth()
    if (!session){
        return false
    }else{
        return await AxiosClient.post(`orders/items/create/`,item,{
            headers: {
                'Authorization': `Bearer ${session.user.access}`
            }
        }).then(response => response.data)
        .catch(error => {
            console.log(error.response)
            throw error
        })
    }
}

export async function updateItem(item:any) {
    const session = await auth()
    if(session){
        return await AxiosClient.put(`orders/items/edit/${item.id}/`,item,{
            headers: {
                'Authorization': `Bearer ${session?.user.access}`
            }
        }).then(response => response.data)
        .catch(error => {
            throw error
        })
    }
    return false
}

export async function deleteItem(itemId:string) {
    const session = await auth()
    if (session){
        return await AxiosClient.delete(`orders/items/delete/${itemId}/`,{
            headers: {
                'Authorization': `Bearer ${session.user.access}`
            }
        }).then(response => response.data)
        .catch(error => {
            throw error
        })
    }
    return false
}

export async function verifyCoupon(data:any) {
    const session = await auth()
    if (session){
        const res =  await AxiosClient.post(`coupons/${data.title}/`,{coupons: data.coupons},{
            headers: {
                'Authorization': `Bearer ${session?.user.access}`
            }
        }).then(response => response.data)
        .catch(error => {
            return {error: error.response.data}
        })
        return res
    }else{
        const res =  await AxiosClient.post(`coupons/${data.title}/`,{coupons: data.coupons, basket: data.basket})
        .then(response => response.data)
        .catch(error => {
            return {error: error.response.data}
        })
        return res
    }
} 
export async function verifyCoupons(data:any) {
    const session = await auth()
    if (session){
        const res =  await AxiosClient.post(`coupons/verify/`,data,{
            headers: {
                'Authorization': `Bearer ${session?.user.access}`
            }
        }).then(response => response.data)
        .catch(error => {
            return {error: error.response.data}
        })
        return res
    }else{
        const res =  await AxiosClient.post(`coupons/verify/`,data,)
        .then(response => response.data)
        .catch(error => {
            return {error: error.response.data}
        })
        return res
    }

} 

export async function getBasket() {
    const session = await auth()
    if (session){
        const res =  await AxiosClient.get(`orders/basket/`,{
            headers: {
                'Authorization': `Bearer ${session?.user.access}`
            }
        }).then(response => response.data)
        .catch(error => {
            return {error: error.response.data}
        })
        return res
    }else{
        const cookieStore = cookies()
        const final_price = cookieStore.get('sub_total')?.value
        const discounted_price = cookieStore.get('discounted_price')?.value
        
        const coupons_cookie = cookieStore.get('coupons')
        if (coupons_cookie){
            const coupons = JSON.parse(coupons_cookie.value)
            return {
                final_price,
                discounted_price,
                coupons
            }
        }
    }
    return {error: "Sth went wrong"}
}

export async function createBasket(data:any) {
    const session = await auth()
    const res =  await AxiosClient.post(`orders/basket/create/`,data,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        return {error: error.response.data}
    })
    return res
}

export async function updateBasket(data:any, ) {
    const session = await auth()
    if (session){
        const res =  await AxiosClient.post(`orders/basket/update/`,{coupons:data.coupons},{
            headers: {
                'Authorization': `Bearer ${session?.user.access}`
            }
        }).then(response => response.data)
        .catch(error => {
            return {error: error.response.data}
        })
        return res
    }else{
        const cookieStore = cookies()
        cookieStore.set({
            name: 'sub_total',
            value: data.sub_total,
            httpOnly: true,
        })
        cookieStore.set({
            name: 'discounted_price',
            value: data.discounted_price,
            httpOnly: true,
        })
        cookieStore.set({
            name: 'coupons',
            value: JSON.stringify(data.coupons_instance),
            httpOnly: true,
        })
        return
    }

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