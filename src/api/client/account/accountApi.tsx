"use server"
import { auth } from '@/lib/auth'
import AxiosClient from "../ClientAxios"

export async function getProfile() {
    const session = await auth()
    if (session){
        return await AxiosClient.get(`profile/`,{
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

export async function editProfile(data:any) {
    const session = await auth()
    return await AxiosClient.put(`profile/edit/`,data,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}

