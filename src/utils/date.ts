/**
 * DATE UTILITIES
 * Wrappers around Intl.DateTimeFormat (Native JS)
 * For complex operations, consider date-fns or dayjs, but this covers basics.
 */

export const formatDate = (date: Date | string | number, locale = 'en-US'): string => {
    const d = new Date(date);
    return d.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    // Example: "Jan 15, 2024"
};

export const formatDateTime = (date: Date | string | number, locale = 'en-US'): string => {
    const d = new Date(date);
    return d.toLocaleString(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    });
    // Example: "Jan 15, 2024, 2:30 PM"
};

export const isToday = (date: Date): boolean => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
};

export const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

export const getGreetingTime = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
};
