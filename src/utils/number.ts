/**
 * NUMBER UTILITIES
 */

export const clamp = (num: number, min: number, max: number): number => {
    return Math.min(Math.max(num, min), max);
    // Example: clamp(15, 0, 10) -> 10
};

export const roundTo = (num: number, decimals: number): number => {
    const factor = Math.pow(10, decimals);
    return Math.round(num * factor) / factor;
    // Example: roundTo(3.14159, 2) -> 3.14
};

export const percentage = (value: number, total: number): number => {
    if (total === 0) return 0;
    return (value / total) * 100;
    // Example: percentage(25, 100) -> 25
};

export const randomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
    // Example: randomInt(1, 10) -> 7
};

export const formatCurrency = (amount: number, currency = 'USD', locale = 'en-US'): string => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(amount);
    // Example: formatCurrency(1234.56) -> "$1,234.56"
};

export const formatCompactNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US', {
        notation: 'compact',
        maximumFractionDigits: 1
    }).format(num);
    // Example: formatCompactNumber(1500) -> "1.5K"
};
