import { useState, useEffect } from 'react';

interface NetworkState {
    online: boolean;
    since: Date | undefined;
    downlink: number | undefined;
    downlinkMax: number | undefined;
    effectiveType: string | undefined;
    rtt: number | undefined;
    saveData: boolean | undefined;
    type: string | undefined;
}

function getNetworkConnection() {
    return (
        (navigator as any).connection ||
        (navigator as any).mozConnection ||
        (navigator as any).webkitConnection
    );
}

function getNetworkState(): NetworkState {
    const connection = getNetworkConnection();

    return {
        online: navigator.onLine,
        since: undefined, // tracked in state
        downlink: connection?.downlink,
        downlinkMax: connection?.downlinkMax,
        effectiveType: connection?.effectiveType,
        rtt: connection?.rtt,
        saveData: connection?.saveData,
        type: connection?.type,
    };
}

export function useNetworkStatus(): NetworkState {
    const [state, setState] = useState<NetworkState>(() => {
        const s = getNetworkState();
        s.since = new Date();
        return s;
    });

    useEffect(() => {
        const handleOnline = () => {
            setState(() => ({
                ...getNetworkState(),
                online: true,
                since: new Date(),
            }));
        };

        const handleOffline = () => {
            setState(() => ({
                ...getNetworkState(),
                online: false,
                since: new Date(),
            }));
        };

        const handleConnectionChange = () => {
            setState((prevState) => ({
                ...getNetworkState(),
                online: navigator.onLine,
                since: prevState.since, // don't reset since on quality change
            }));
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        const connection = getNetworkConnection();
        if (connection) {
            connection.addEventListener('change', handleConnectionChange);
        }

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
            if (connection) {
                connection.removeEventListener('change', handleConnectionChange);
            }
        };
    }, []);

    return state;
}
