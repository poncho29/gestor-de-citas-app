import axios from "axios";

import { getToken } from "./auth";

export const AxiosInstance = axios.create ( { baseURL: process.env.URL_BASE } ) ;

AxiosInstance.interceptors.request.use( async(config) => {
    const { token, error } = await getToken()

    if (!token && error) {
      throw new Error(error);
    }
    
    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.log(error)
    return Promise.reject(error);
  }
);

// AxiosInstance.interceptors.response.use(
//   (response) => {
//       return response;
//   },
//   (error) => {
//       return Promise.reject(error);
//   }
// );