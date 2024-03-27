import axios from "axios"
const baseURL = process.env.API_URL

const ClientAxios = axios.create({
    baseURL: baseURL
})

export default ClientAxios
