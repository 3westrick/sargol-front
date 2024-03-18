import axios from "axios"
const baseURL = process.env.API_URL


const AxiosInstance = axios.create({
    baseURL,
})

export default AxiosInstance
