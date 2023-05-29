import axios from 'axios';
export const axiosInstance =axios.create({
    baseURL: 'http://localhost:5000',
	timeout: 8000,
    headers:{
        Accept: 'application/json',
        // authorization: `Bearer ${localStorage.getItem('token')}`
    }
})