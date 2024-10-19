import axios from 'axios';
import { getCookie } from './cookie';
const instance = axios.create({
    // baseURL: 'http://localhost:3000/',
    timeout: 2000
    
})

instance.interceptors.request.use(function (config) {
    // console.log(config)
    const token = getCookie('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
export default instance