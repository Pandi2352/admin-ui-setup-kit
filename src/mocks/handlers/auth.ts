import { http, HttpResponse, delay } from 'msw';

// Helper to simulate network delay
const simulateDelay = async () => {
    await delay(import.meta.env.DEV ? 800 : 0);
};

export const authHandlers = [
    // Login
    http.post('*/api/v1/auth/login', async ({ request }) => {
        await simulateDelay();
        const body = await request.json() as any;

        if (body.email === 'admin@example.com' && body.password === 'admin123') {
            return HttpResponse.json({
                user: {
                    id: 'u-admin',
                    name: 'Admin User',
                    email: 'admin@example.com',
                    role: 'admin',
                    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=6366f1&color=fff'
                },
                accessToken: 'mock-jwt-access-token-admin',
                refreshToken: 'mock-jwt-refresh-token-admin'
            });
        }

        if (body.email === 'user@example.com' && body.password === 'user123') {
            return HttpResponse.json({
                user: {
                    id: 'u-user',
                    name: 'Regular User',
                    email: 'user@example.com',
                    role: 'user',
                    avatar: 'https://ui-avatars.com/api/?name=Regular+User&background=22c55e&color=fff'
                },
                accessToken: 'mock-jwt-access-token-user',
                refreshToken: 'mock-jwt-refresh-token-user'
            });
        }

        return new HttpResponse(null, { status: 401, statusText: 'Invalid credentials' });
    }),

    // Me (Get Current User)
    http.get('*/api/v1/auth/me', async ({ request }) => {
        await simulateDelay();
        const authHeader = request.headers.get('Authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return new HttpResponse(null, { status: 401 });
        }

        return HttpResponse.json({
            id: 'u-admin',
            name: 'Admin User',
            email: 'admin@example.com',
            role: 'admin',
            avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=6366f1&color=fff'
        });
    }),

    // Refresh Token
    http.post('*/api/v1/auth/refresh', async () => {
        await simulateDelay();
        return HttpResponse.json({
            accessToken: 'mock-new-access-token-' + Date.now(),
            refreshToken: 'mock-new-refresh-token-' + Date.now()
        });
    }),

    // Logout
    http.post('*/api/v1/auth/logout', async () => {
        await simulateDelay();
        return HttpResponse.json({ success: true });
    })
];
