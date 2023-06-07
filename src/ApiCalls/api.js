import axiosInstance from "./axiosInstance"

export  const RegisterUser=async(payload)=>{
    try {
        const response = await axiosInstance.post('/api/user/register',payload)
        return response.data
    }catch(error){
        return error.message
    }
}

export const GetUser=async()=>{
     try{
         const response= await axiosInstance.get('/api/user/get-users')
         return response.data
     }catch (error){
         return error.message
     }
}




