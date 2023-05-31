import axiosInstance from "./axiosInstance"

export  const RegisterUser=async(payload)=>{
    try {
        const response = await axiosInstance.post('/api/register',payload)
        return response.data
    }catch(error){
        return error.message
    }
}

export  const LoginUser=async(payload)=>{
    try {
        const response = await axiosInstance.post('/api/login',payload)
        return response.data
    }catch(error){
        return error.message
    }
}
export const GetCurrentUser =async()=>{
    try {
        const response = await axiosInstance.get('/api/getUsers')
        return response.data
    }catch(error){
        return error.message
}
}

export const GetStuff  =async()=>{
        try {
            const response = await axiosInstance.get('/api/getStuff')
            return response.data
        }catch(error){
            return error.message
        }
}
    



