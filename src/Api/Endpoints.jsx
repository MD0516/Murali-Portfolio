import { api } from "./axios";

export const fetchProfile = async () => {
    try {
        const res = await api.get("/api/auth/profile")

        return res.data
    } catch (error) {
        console.log(error)
    }
}