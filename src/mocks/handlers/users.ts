import { http, HttpResponse, delay } from 'msw';

// Mock Data
const users = Array.from({ length: 25 }).map((_, i) => ({
    id: `u-${i + 1}`,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: i % 3 === 0 ? 'admin' : 'user',
    status: i % 5 === 0 ? 'inactive' : 'active',
    joinedAt: new Date(Date.now() - Math.random() * 10000000000).toISOString()
}));

export const userHandlers = [
    http.get('*/api/v1/users', async () => {
        await delay(500);
        return HttpResponse.json({
            items: users.slice(0, 10),
            total: users.length,
            page: 1,
            size: 10,
            totalPages: Math.ceil(users.length / 10)
        });
    }),

    http.get('*/api/v1/users/:id', async ({ params }) => {
        await delay(300);
        const { id } = params;
        const user = users.find(u => u.id === id);

        if (!user) {
            return new HttpResponse(null, { status: 404 });
        }
        return HttpResponse.json(user);
    })
];
