import axios, { type CreateAxiosDefaults } from "axios"

import { getErrorMessage } from "./error";
import { authTokenService } from "@/services/authTokenService";

const options: CreateAxiosDefaults = {
  baseURL: `${process.env.NEXT_PUBLIC_CLIENT_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
}

export const apiClassic = axios.create(options);
export const apiWithAuth = axios.create(options);
export const apiWithDelay = axios.create(options);

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

apiWithDelay.interceptors.request.use(async config => {
  await delay(1000);
  return config;
});

apiWithAuth.interceptors.request.use(
  config => {
    const accessToken = authTokenService.getAccessToken();
  
    if (config?.headers && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  
    return config
  },
  (error) => Promise.reject(error)
);

apiWithAuth.interceptors.response.use(
  config => config,
  async error => {
  	const originalRequest = error.config;

  	if ((error?.response?.status === 401 || getErrorMessage(error) === "jwt expired" || getErrorMessage(error) === "jwt must be provided") && originalRequest && !originalRequest._isRetry) {
      originalRequest._isRetry = true;

  	  try {
  	  	await authTokenService.generateNewTokens()

  	  	return apiWithAuth.request(originalRequest)
  	  } catch (error) {
  	  	if (getErrorMessage(error) === "jwt expired") authTokenService.removeAccessToken();
  	  }
  	}  

  	throw error;
  }
)