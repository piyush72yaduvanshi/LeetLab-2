import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_BASEURL || "http://localhost:8080/api/v1",
  withCredentials: true,
});
