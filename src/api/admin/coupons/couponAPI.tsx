"use server"
import { auth } from '@/lib/auth'
import AxiosAdmin from "../AdminAxios"
type Category = {
    id: number | undefined | null,
    title: string | undefined | null,
    slug: string | undefined | null,
    parent: number | undefined | null,
}

export async function getCoupons(query:string, field:string, order:string, limit: number, offset: number) {
    const session = await auth()
    return await AxiosAdmin.get(`coupons/?limit=${limit}&offset=${offset}&search=${query}&ordering=${order}${field}`,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}


export async function getCoupon(couponId: number) {
    const session = await auth()
    return await AxiosAdmin.get(`coupons/${couponId}/`,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}



export async function createCoupon(coupon:any) {
    const session = await auth()
    return await AxiosAdmin.post(`coupons/create/`,coupon,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        console.log(error.response)
        throw error
    })
}

export async function updateCoupon(coupon:any) {
    const session = await auth()
    return await AxiosAdmin.put(`coupons/edit/${coupon.id}/`,coupon,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        console.log(error.response)
        throw error
    })
}

export async function deleteCoupon(coupon:any) {
    const session = await auth()
    return await AxiosAdmin.delete(`coupons/edit/${coupon.id}/`,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        console.log(error.response)
        throw error
    })
}

