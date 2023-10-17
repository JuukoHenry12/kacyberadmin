import axios from 'axios';
 const axiosInstance =axios.create({
    baseURL: 'http://159.138.166.218/',
	timeout: 8000,
    headers:{
        Accept: 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`
    }
})
export default axiosInstance