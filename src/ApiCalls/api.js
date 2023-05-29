import axiosInstance from "./axiosInstance"

export const GetCurrentUser =async()=>{
    try {
        const response = await axiosInstance.get('/api/getUsers')
        return response.data
    }catch(error){
        return error.message
    }
}