import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7004/api/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
  withCredentials: true, // Bật nếu cần gửi cookie/JWT
  //... other axios options
});
// Trước khi gọi API, thêm token vào headers
api.interceptors.request.use(function (config) {
  // Do something before request is sent
  const token = localStorage.getItem("token")
  if(token){
      config.headers.Authorization = `Bearer ${token}`
  }
  
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
export default api;


export const GOOGLE_MAPS_API_KEY = "AlzaSyogxx_23O6-3-aOd9ZLmR_5xXAkQh8j8Gi"
