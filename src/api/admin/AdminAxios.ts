import axios from "axios"
const baseURL = process.env.API_URL
const admin = process.env.BACKEND_ADMIN
const adminBase = baseURL +"/" + admin

const AxiosAdmin = axios.create({
    baseURL: adminBase
})

export default AxiosAdmin
