"use server"
import axios from "axios"
const baseURL = process.env.API_URL

const AxiosInstance = axios.create({
    baseURL: baseURL
})

import { auth } from "@/lib/auth"

export async function createCustom(data:FormData | any) {
    console.log(data)
    const session = await auth()
    return await AxiosInstance.post(`custom/create/`,data).then(response => response.data)
    .catch(error => {
        console.log(error.response)
        throw error
    })
}