import axios from 'axios';

const instance = axios.create({
    // baseURL: 'http://localhost:3000/',
    timeout: 2000
    
})

// 定义一个函数来获取指定名称的Cookie值
const getCookie = (name:string) => {
  const cookies = document.cookie;
  const cookieArray = cookies.split("; ");
  for (let i = 0; i < cookieArray.length; i++) {
      const cookiePair = cookieArray[i].split("=");
      if (name === cookiePair[0]) {
          return decodeURIComponent(cookiePair[1]);
      }
  }
  return null;
}
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