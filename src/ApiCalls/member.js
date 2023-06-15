import axiosInstance from "./axiosInstance"

export  const  Addmember=async(payload)=>{
    try {
        const response = await axiosInstance.post('/api/member/addMember',payload)
        return response.data
    }catch(error){
        return error.message
    }
}

export const Getmember=async()=>{
     try{
         const response= await axiosInstance.get('/api/member/get-member')
         return response.data
     }catch (error){
         return error.message
     }
}

export const DeleteMember = async(id)=>{
   
    try {
       const response=  await axiosInstance.delete(`/api/user/delete-member/${id}`)
       
       return response.data

    }catch(error){
        return error.message
    }
}
