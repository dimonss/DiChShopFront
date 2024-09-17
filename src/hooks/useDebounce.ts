import { useCallback, useRef } from 'react';

const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    return useCallback(
        (...args: any[]) => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
            timer.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay],
    );
};

export default useDebounce;