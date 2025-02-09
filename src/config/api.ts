import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5100/api/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
  withCredentials: true, // Bật nếu cần gửi cookie/JWT
  //... other axios options
});
// Trước khi gọi API, thêm token vào headers
api.interceptors.request.use((config) => {
  const token = new URLSearchParams(location.search).get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default api;
