import axios from "axios";
import {refreshTokenApi} from '../Auth/refreshTokenApi'


export const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

api.interceptors.request.use(
  (response) => {

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 

      try {
        await refreshTokenApi(); 
        return api(originalRequest);
      } catch (refreshError) {
        if (refreshError.response && refreshError.response.status === 400) {
          localStorage.removeItem("isLoggedin"); 
          window.location.href = "/user-login"; 
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

