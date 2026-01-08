import { useRef, useEffect } from 'react';

/**
 * Hook to handle clicks outside of a specified element.
 * Useful for closing modals, dropdowns, or popovers.
 * 
 * @param handler Function to call when click occurs outside
 * @param mouseEvent 'mousedown' or 'mouseup'
 */
export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
    handler: (event: MouseEvent | TouchEvent) => void,
    mouseEvent: 'mousedown' | 'mouseup' = 'mousedown'
) {
    const ref = useRef<T>(null);

    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            const el = ref.current;

            // Do nothing if clicking ref's element or descendent elements
            if (!el || el.contains(event.target as Node)) {
                return;
            }

            handler(event);
        };

        document.addEventListener(mouseEvent, listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener(mouseEvent, listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [handler, mouseEvent]);

    return ref;
}
