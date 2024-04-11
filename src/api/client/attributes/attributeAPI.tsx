"use server"
import { auth } from '@/lib/auth'
import ClientAxios from '../ClientAxios'

type Attribute = {
    id: number | undefined | null,
    title: string | undefined | null,
    slug: string | undefined | null
}

type Value = {
    id: number | undefined | null,
    title: string | undefined | null,
    slug: string | undefined | null,
    attribute: number | undefined | null,
    image: any,
}

export async function getAttributes(att_ids: string) {
    
    const session = await auth()
    return await ClientAxios.get(`attributes/?id__in=${att_ids}`,{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}