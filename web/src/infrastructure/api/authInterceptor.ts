import { type InternalAxiosRequestConfig } from 'axios';

export const authInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('@NorthernRoute:token');

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};
