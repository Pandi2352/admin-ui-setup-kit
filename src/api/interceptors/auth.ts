import { type InternalAxiosRequestConfig } from 'axios';
import { storage } from '../../utils/storage';

export const authInterceptor = (config: InternalAxiosRequestConfig) => {
    const token = storage.getItem<string>('accessToken');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
};

// Add other request interceptors here if needed (e.g. logging, device info)
