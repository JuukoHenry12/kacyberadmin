import axiosInstance from "./axiosInstance"

const RegisterUser=async()=>{
    try {
        const response = await axiosInstance.get('/api/register')
        return response.data
    }catch(error){
        return error.message
    }
}

const LoginUser=async()=>{
    try {
        const response = await axiosInstance.get('/api/login')
        return response.data
    }catch(error){
        return error.message
    }
}
const GetCurrentUser =async()=>{
    try {
        const response = await axiosInstance.get('/api/getUsers')
        return response.data
    }catch(error){
        return error.message
    }
}

export default {GetCurrentUser,LoginUser,RegisterUser}