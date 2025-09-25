import { useState, useEffect, useCallback } from 'react';

interface PWAUpdateState {
    isUpdateAvailable: boolean;
    isUpdating: boolean;
    updateServiceWorker: () => void;
}

const usePWAUpdate = (): PWAUpdateState => {
    const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

    const updateServiceWorker = useCallback(() => {
        if (registration && registration.waiting) {
            setIsUpdating(true);
            registration.waiting.postMessage({ type: 'SKIP_WAITING' });
            
            // Reload the page after a short delay
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }, [registration]);

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then((reg) => {
                    setRegistration(reg);
                    
                    // Check for updates
                    reg.addEventListener('updatefound', () => {
                        const newWorker = reg.installing;
                        if (newWorker) {
                            newWorker.addEventListener('statechange', () => {
                                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                    // New content is available
                                    setIsUpdateAvailable(true);
                                }
                            });
                        }
                    });
                })
                .catch((error) => {
                    console.log('Service Worker registration failed:', error);
                });

            // Listen for controlling service worker changes
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                window.location.reload();
            });
        }
    }, []);

    return {
        isUpdateAvailable,
        isUpdating,
        updateServiceWorker
    };
};

export default usePWAUpdate;
