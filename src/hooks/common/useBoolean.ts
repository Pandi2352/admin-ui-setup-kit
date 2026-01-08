import { useState, useCallback } from 'react';

/**
 * Hook to manage boolean state (true/false).
 * Useful for modals, toggles, loading states.
 */
export function useBoolean(initialValue: boolean = false) {
    const [value, setValue] = useState(initialValue);

    const toggle = useCallback(() => setValue((v) => !v), []);
    const setTrue = useCallback(() => setValue(true), []);
    const setFalse = useCallback(() => setValue(false), []);

    return { value, setValue, toggle, setTrue, setFalse };
}
