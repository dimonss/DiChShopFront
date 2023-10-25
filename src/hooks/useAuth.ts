import { useEffect } from 'react';
import { useAppDispatch } from 'types/globalTypes';
import { useSearchParams } from 'react-router-dom';
import { loginUser } from 'redux/slices/userSlice';

const useAuth = () => {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        const token = searchParams.get('auth');
        if (token?.length === 36) {
            dispatch(loginUser(token));
            setSearchParams({});
        }
    }, [searchParams]);
    return { alertLogin: alert };
};

export default useAuth;
