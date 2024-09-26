"use server"
import { auth } from '@/lib/auth'
import ClientAxios from "../ClientAxios"





export async function getWidget(type: string) {
    return await ClientAxios.get(`widgets/groups/${type}/`,{
        headers: {
            // 'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}
