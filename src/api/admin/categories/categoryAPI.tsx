"use server"
import { auth } from '@/lib/auth'
import AxiosAdmin from "../AdminAxios"
type Category = {
    id: number | undefined | null,
    title: string | undefined | null,
    slug: string | undefined | null,
    parent: number | undefined | null,
}

export async function getCategories() {
    const session = await auth()
    return await AxiosAdmin.get('categories/',{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}

export async function getCategoriesProduct() {
    const session = await auth()
    return await AxiosAdmin.get('categories/product/',{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        throw error
    })
}


export async function createCategory(category:any) {
    const session = await auth()
    return await AxiosAdmin.post(`categories/create/`,{
        title: category.title,
        slug: category.slug,
        parent: category.parent
    },{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        console.log(error.response)
        throw error
    })
}

export async function updateCategory(category:any) {
    const session = await auth()
    return await AxiosAdmin.put(`categories/edit/${category.id}/`,{
        title: category.title,
        slug: category.slug,
        parent: category.parent
    },{
        headers: {
            'Authorization': `Bearer ${session?.user.access}`
        }
    }).then(response => response.data)
    .catch(error => {
        console.log(error.response)
        throw error
    })
}
