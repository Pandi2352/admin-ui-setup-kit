/**
 * ARRAY UTILITIES
 * Helper functions for array manipulation.
 */

// --- Segmentation ---

export const chunk = <T>(arr: T[], size: number): T[][] => {
    if (!arr.length || size <= 0) return [];
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
    // Example: chunk([1,2,3,4], 2) -> [[1,2],[3,4]]
};

// --- Modification ---

export const unique = <T>(arr: T[]): T[] => {
    return Array.from(new Set(arr));
    // Example: unique([1,1,2]) -> [1,2]
};

export const compact = <T>(arr: (T | null | undefined | false | 0 | "")[]): T[] => {
    return arr.filter(Boolean) as T[];
    // Example: compact([0, 1, false, 2]) -> [1, 2]
};

export const shuffle = <T>(arr: T[]): T[] => {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
    // Example: shuffle([1,2,3]) -> [3,1,2]
};

// --- Retrieval ---

export const first = <T>(arr: T[], n = 1): T | T[] => {
    if (n === 1) return arr[0];
    return arr.slice(0, n);
};

export const last = <T>(arr: T[], n = 1): T | T[] => {
    if (n === 1) return arr[arr.length - 1];
    return arr.slice(-n);
};

// --- Set Operations ---

export const intersection = <T>(arr1: T[], arr2: T[]): T[] => {
    const s2 = new Set(arr2);
    return arr1.filter(x => s2.has(x));
    // Example: intersection([1,2], [2,3]) -> [2]
};

export const difference = <T>(arr1: T[], arr2: T[]): T[] => {
    const s2 = new Set(arr2);
    return arr1.filter(x => !s2.has(x));
    // Example: difference([1,2,3], [2]) -> [1,3]
};

// --- Data Structure Transformation ---

export const groupBy = <T>(arr: T[], key: keyof T): Record<string, T[]> => {
    return arr.reduce((acc, item) => {
        const groupKey = String(item[key]);
        if (!acc[groupKey]) {
            acc[groupKey] = [];
        }
        acc[groupKey].push(item);
        return acc;
    }, {} as Record<string, T[]>);
    // Example: groupBy([{role:'admin'}, {role:'user'}], 'role')
};

export const keyBy = <T>(arr: T[], key: keyof T): Record<string, T> => {
    return arr.reduce((acc, item) => {
        const itemKey = String(item[key]);
        acc[itemKey] = item;
        return acc;
    }, {} as Record<string, T>);
    // Example: keyBy([{id:1}, {id:2}], 'id') -> {1: {id:1}, 2: {id:2}}
};

export const sortBy = <T>(arr: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] => {
    return [...arr].sort((a, b) => {
        if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
        return 0;
    });
};

// --- Utility ---

export const range = (start: number, end: number): number[] => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
    // Example: range(1, 5) -> [1,2,3,4,5]
};
