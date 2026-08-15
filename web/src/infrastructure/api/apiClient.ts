import axios from 'axios';
import { authInterceptor } from './authInterceptor';

const baseURL = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(authInterceptor, error =>
  Promise.reject(error),
);
