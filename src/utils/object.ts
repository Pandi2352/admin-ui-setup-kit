/**
 * OBJECT UTILITIES
 * Helper functions for object manipulation.
 */

// --- Property Access ---

export const pick = <T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
    const result = {} as Pick<T, K>;
    keys.forEach(key => {
        if (key in obj) {
            result[key] = obj[key];
        }
    });
    return result;
    // Example: pick({a:1, b:2, c:3}, ['a','c']) -> {a:1, c:3}
};

export const omit = <T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
    const result = { ...obj };
    keys.forEach(key => {
        delete result[key];
    });
    return result;
    // Example: omit({a:1, b:2, c:3}, ['b']) -> {a:1, c:3}
};

// --- Checks ---

export const isEmpty = (obj: object): boolean => {
    if (obj === null || typeof obj !== 'object') return true;
    return Object.keys(obj).length === 0;
    // Example: isEmpty({}) -> true
};

export const has = (obj: any, path: string): boolean => {
    const keys = path.split('.');
    let current = obj;

    for (const key of keys) {
        if (current === null || current === undefined || !Object.prototype.hasOwnProperty.call(current, key)) {
            return false;
        }
        current = current[key];
    }
    return true;
    // Example: has({a:{b:2}}, 'a.b') -> true
};

// --- Deep Access ---

export const get = (obj: any, path: string, defaultValue: any = undefined): any => {
    const keys = path.split('.');
    let current = obj;

    for (const key of keys) {
        if (current === null || current === undefined) {
            return defaultValue;
        }
        current = current[key];
    }

    return current !== undefined ? current : defaultValue;
    // Example: get({a:{b:2}}, 'a.b') -> 2
};


// --- Transformation ---

export const mapValues = <T extends object, U>(obj: T, fn: (value: T[keyof T], key: keyof T) => U): Record<keyof T, U> => {
    const result = {} as Record<keyof T, U>;
    (Object.keys(obj) as Array<keyof T>).forEach(key => {
        result[key] = fn(obj[key], key);
    });
    return result;
    // Example: mapValues({a:1, b:2}, x => x * 2) -> {a:2, b:4}
};

export const invert = (obj: Record<string, string | number>): Record<string, string> => {
    const result: Record<string, string> = {};
    Object.keys(obj).forEach(key => {
        result[String(obj[key])] = key;
    });
    return result;
    // Example: invert({a:1}) -> {'1':'a'}
};

// --- Clone/Merge ---

export const deepClone = <T>(obj: T): T => {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(deepClone) as any;
    }

    const result = {} as T;
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            result[key] = deepClone(obj[key]);
        }
    }
    return result;
    // Example use: const copy = deepClone(original);
};
