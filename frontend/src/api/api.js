import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("[API ERROR]:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
