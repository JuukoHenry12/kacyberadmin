import axios from 'axios';
 const axiosInstance =axios.create({
    baseURL: 'http://localhost:8000',
	timeout: 8000,
    headers:{
        Accept: 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`
    }
})
export default axiosInstance