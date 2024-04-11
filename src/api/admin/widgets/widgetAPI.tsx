"use server"
import { auth } from '@/lib/auth'
import AxiosAdmin from "../AdminAxios"
type Category = {
    id: number | undefined | null,
    title: string | undefined | null,
    slug: string | undefined | null,
    parent: number | undefined | null,
}

export async function getWidgets() {
    const session = await auth()
    return await AxiosAdmin.get(`widgets/groups/`,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        console.log(error.response.data)
        throw error
    })
}


export async function updateWidget(widetId: string, data: any) {
    const session = await auth()
    return await AxiosAdmin.put(`widgets/edit/${widetId}/`,data,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}
