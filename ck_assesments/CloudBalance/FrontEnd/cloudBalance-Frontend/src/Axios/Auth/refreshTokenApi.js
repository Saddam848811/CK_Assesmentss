import { api } from "../Interceptor/axios"

export const refreshTokenApi=async()=>{

    const response = await api.post("auth/refreshToken")

    
}