import { useEffect } from 'react';
import { privateAPI } from 'api/privateAPI';
import { useAppSelector } from 'types/globalTypes';

const TokenRefresher = () => {
    const token = useAppSelector((state) => state.user.token);

    useEffect(() => {
        privateAPI.defaults.headers.common['auth'] = token;
    }, [token]);
    return null;
};

export default TokenRefresher;
