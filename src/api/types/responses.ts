export interface ApiResponse<T = any> {
    data: T;
    message?: string;
    status: number;
    success: boolean;
    timestamp?: string;
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    size: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
}

export interface ErrorResponse {
    message: string;
    code?: string;
    errors?: Record<string, string[]>;
    stack?: string;
}

export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}
