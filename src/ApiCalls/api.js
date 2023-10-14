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

export const GetPaidCardsUsers=async()=>{
     try{
        const response= await axiosInstance.get('/api/cardpayment/get-cardusers')
        return response.data

     }catch(error){
        return error.message
     }
}
export const CountUsers=async()=>{
    try{
        const response= await axiosInstance.get('/api/user/get-users-count')
        return response.data
    }catch (error){
        return error.message
    }
}


export const DeleteUser = async(id)=>{
   
    try {
       const response=  await axiosInstance.delete(`/api/user/delete-user/${id}`)
       
       return response.data

    }catch(error){
        return error.message
    }
}



