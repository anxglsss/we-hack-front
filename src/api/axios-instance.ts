import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://wehack-backend-production.up.railway.app/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken")
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
    }
    return Promise.reject(error);
  }
)