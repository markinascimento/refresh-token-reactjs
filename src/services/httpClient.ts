import axios from "axios";

import { storageKeys } from "@/config/storageKeys";
import { AuthServices } from "./AuthServices";

export const httpClient = axios.create({
  baseURL: "http://localhost:3000",
});

httpClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(storageKeys.ACCESS_TOKEN);

    if (accessToken) {
      config.headers.set("Authorization", `Bearer ${accessToken}`);
    }

    return config;
  }
);

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem(storageKeys.REFRESH_TOKEN);

    if(originalRequest.url === '/refresh-token') {
      localStorage.clear()
      return Promise.reject(error);
    }

    if((error.response && error?.response?.status !== 401) || !refreshToken) {
      return Promise.reject(error);
    } 
     
    const {
      accessToken,
      refreshToken: newRefreshToken
    } = await AuthServices.refreshToken(refreshToken)

    localStorage.setItem(storageKeys.ACCESS_TOKEN, accessToken);
    localStorage.setItem(storageKeys.REFRESH_TOKEN, newRefreshToken);

    return httpClient(originalRequest)
  }
)
