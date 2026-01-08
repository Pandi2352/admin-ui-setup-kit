import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { storage } from '../../utils/storage';
import { ENDPOINTS, API_CONFIG } from '../endpoints';
import { type TokenResponse } from '../types/responses';

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (reason?: any) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

export const errorInterceptor = async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    const { response } = error;

    // Handle 401 Unauthorized (Token Expiry)
    if (response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
            return new Promise(function (resolve, reject) {
                failedQueue.push({ resolve, reject });
            }).then(token => {
                if (originalRequest.headers) {
                    originalRequest.headers['Authorization'] = 'Bearer ' + token;
                }
                return axios(originalRequest);
            }).catch(err => {
                return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
            const refreshToken = storage.getItem<string>('refreshToken');

            if (!refreshToken) {
                throw new Error('No refresh token available');
            }

            // Call backend to refresh token
            const { data } = await axios.post<TokenResponse>(
                `${API_CONFIG.BASE_URL}${ENDPOINTS.AUTH.REFRESH}`,
                { refreshToken }
            );

            const { accessToken, refreshToken: newRefreshToken } = data;

            storage.setItem('accessToken', accessToken);
            if (newRefreshToken) {
                storage.setItem('refreshToken', newRefreshToken);
            }

            // Update headers for the retry
            if (originalRequest.headers) {
                originalRequest.headers['Authorization'] = 'Bearer ' + accessToken;
            }

            processQueue(null, accessToken);
            return axios(originalRequest);

        } catch (refreshError) {
            processQueue(refreshError as Error, null);
            storage.removeItem('accessToken');
            storage.removeItem('refreshToken');
            // Redirect to login or handle session expiry
            window.location.href = '/login';
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }

    // Global Error logging or Toast notifications can be triggered here
    if (response?.status && response.status >= 500) {
        console.error('Server error occurred:', response.data);
    }

    return Promise.reject(error);
};
