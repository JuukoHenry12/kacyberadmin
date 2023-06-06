import axiosInstance from "./axiosInstance"

export const RegisterStuff=async(payload)=>{
    try {
      const response = await axiosInstance.post('/api/stuff/register-stuff',payload) 
      return response.data
    }catch(error){
        return error.message
    }
}

export  const LoginStuff=async(payload)=>{
    try {
        const response = await axiosInstance.post('/api/stuff/login',payload)
        return response.data
    }catch(error){
        return error.message
    }
}
export const GetStuff =async()=>{
    try {
        const response = await axiosInstance.get('/api/stuff/get-Stuff')
        return response.data
    }catch(error){
        return error.message
}
}

export const deleteStuff  =async(payload,id)=>{
    try {
        const response = await axiosInstance.get(`/api/stuff/delete-stuff/${id}`,payload)
        return response.data
    }catch(error){
        return error.message
    }
}

export const UpdateStuff  =async(payload,id)=>{
    try {
        const response = await axiosInstance.get(`/api/stuff/update-stuff/${id}`,payload)
        return response.data
    }catch(error){
        return error.message
    }
}

