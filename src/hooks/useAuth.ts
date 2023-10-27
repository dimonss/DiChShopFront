import { useCallback, useEffect } from 'react';
import { useAppDispatch } from 'types/globalTypes';
import { useSearchParams } from 'react-router-dom';
import { loginUser } from 'redux/slices/userSlice';
import Swal from 'sweetalert2';
import strings from 'constants/strings';

const useAuth = () => {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const successCallback = useCallback(() => {
        Swal.fire({
            position: 'top',
            icon: 'success',
            title: strings.you_are_success_authorized,
            showConfirmButton: false,
            timer: 1500,
        });
    }, []);

    useEffect(() => {
        const token = searchParams.get('auth');
        if (token?.length === 36) {
            dispatch(loginUser({ token, successCallback }));
            setSearchParams({});
        }
    }, [searchParams]);
};

export default useAuth;
