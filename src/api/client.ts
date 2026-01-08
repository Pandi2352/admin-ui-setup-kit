import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { API_CONFIG } from './endpoints';
import { authInterceptor } from './interceptors/auth';
import { errorInterceptor } from './interceptors/error';

// 1. Create Axios Instance
const client: AxiosInstance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// 2. Attach Interceptors
client.interceptors.request.use(authInterceptor, (error) => Promise.reject(error));
client.interceptors.response.use((response) => response, errorInterceptor);

// 3. Define Helper Methods
export const api = {
    get: <T>(url: string, config?: AxiosRequestConfig) =>
        client.get<T>(url, config).then(res => res.data),

    post: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
        client.post<T>(url, data, config).then(res => res.data),

    put: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
        client.put<T>(url, data, config).then(res => res.data),

    patch: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
        client.patch<T>(url, data, config).then(res => res.data),

    delete: <T>(url: string, config?: AxiosRequestConfig) =>
        client.delete<T>(url, config).then(res => res.data),
};

export default client;
