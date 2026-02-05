import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export const api = axios.create({
    baseURL: '',
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    withCredentials: true
})