import { privateAPI } from 'api/privateAPI';
import useResetStore from 'hooks/useResetStore';

const useNoAuthHandler = () => {
    const resetStore = useResetStore();
    privateAPI.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                resetStore();
                location.reload();
            }
        },
    );
};

export default useNoAuthHandler;
