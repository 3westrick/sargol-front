"use server"
import { auth } from '@/lib/auth'
import AxiosAdmin from "../AdminAxios"

export async function getProducts() {
    const session = await auth()
    return await AxiosAdmin.get('products/',{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}
