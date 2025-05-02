import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://api.example.com/api',
  withCredentials: true,
})

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Неавторизован")
      // Можешь сделать редирект или logout
    }
    return Promise.reject(error)
  }
)