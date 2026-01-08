import axios, {
    type AxiosInstance,
    type AxiosRequestConfig,
    type AxiosResponse,
    type InternalAxiosRequestConfig,
    AxiosError
} from 'axios';
import { API_BASE_URL, API_TIMEOUT, ENDPOINTS, HTTP_STATUS } from '../../constants/api.constants';

// --- Types ---

// Helper to get access token from storage
const getAccessToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('accessToken');
    }
    return null;
};

// Helper to store tokens
const setTokens = (accessToken: string, refreshToken?: string) => {
    localStorage.setItem('accessToken', accessToken);
    if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
    }
};

// Helper to clear tokens
const clearTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};


// --- Axios Instance Creation ---

const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// --- Request Interceptor ---

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getAccessToken();
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: unknown) => {
        return Promise.reject(error);
    }
);

// --- Response Interceptor ---

interface RefreshTokenResponse {
    accessToken: string;
    refreshToken: string;
}

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


apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // Handle 401 Unauthorized (Token Expiry)
        if (error.response?.status === HTTP_STATUS.UNAUTHORIZED && !originalRequest._retry) {

            if (isRefreshing) {
                // If already refreshing, queue this request
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    if (originalRequest.headers) {
                        originalRequest.headers['Authorization'] = 'Bearer ' + token;
                    }
                    return apiClient(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                // Call backend to refresh token
                // Note: Using a fresh axios instance to avoid infinite loops
                const response = await axios.post<RefreshTokenResponse>(`${API_BASE_URL}${ENDPOINTS.AUTH.REFRESH}`, {
                    refreshToken
                });

                const { accessToken, refreshToken: newRefreshToken } = response.data;

                setTokens(accessToken, newRefreshToken);

                apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
                if (originalRequest.headers) {
                    originalRequest.headers['Authorization'] = 'Bearer ' + accessToken;
                }

                processQueue(null, accessToken);
                return apiClient(originalRequest);

            } catch (refreshError) {
                processQueue(refreshError as Error, null);
                clearTokens();
                // Redirect to login
                window.location.href = '/login';
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        // Handle Global Errors (e.g., 500, Network Errors)
        if (!error.response) {
            // Network Error
            console.error('Network Error:', error);
            // You might want to dispatch a toast notification here
        } else if (error.response.status >= 500) {
            console.error('Server Error:', error.response.data);
        }

        return Promise.reject(error);
    }
);

// --- Generic Request Helper ---

/**
 * Generic helper to make API requests with type safety.
 * Usage: const data = await apiRequest<User[]>({ method: 'GET', url: '/users' });
 */
export const apiRequest = async <T>(config: AxiosRequestConfig): Promise<T> => {
    try {
        const response = await apiClient(config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// --- HTTP Method Helpers ---

export const get = <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    apiRequest<T>({ ...config, method: 'GET', url });

export const post = <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    apiRequest<T>({ ...config, method: 'POST', url, data });

export const put = <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    apiRequest<T>({ ...config, method: 'PUT', url, data });

export const patch = <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    apiRequest<T>({ ...config, method: 'PATCH', url, data });

export const del = <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    apiRequest<T>({ ...config, method: 'DELETE', url });

export default apiClient;
