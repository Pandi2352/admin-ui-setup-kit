import { useEffect, useRef } from 'react';

/**
 * Hook to execute a callback after a timeout, with a declarative API.
 * 
 * @param callback Function to call
 * @param delay Delay in ms (or null to stop)
 */
export function useTimeout(callback: () => void, delay: number | null) {
    const savedCallback = useRef(callback);

    // Remember the latest callback if it changes.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the timeout.
    useEffect(() => {
        // Don't schedule if no delay is specified.
        // Note: 0 is a valid value for delay.
        if (delay === null) {
            return;
        }

        const id = setTimeout(() => {
            savedCallback.current();
        }, delay);

        return () => clearTimeout(id);
    }, [delay]);
}
