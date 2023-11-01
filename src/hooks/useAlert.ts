import { useCallback } from 'react';
import Swal from 'sweetalert2';
import colors from 'layout/colors';

const useAlert = () => {
    const showErrorAlert = useCallback((message: string, timer: number = 1500) => {
        Swal.fire({
            position: 'top',
            icon: 'error',
            title: message,
            showConfirmButton: false,
            timer: timer,
            color: colors.sideNavBarBG,
        });
    }, []);

    const showSuccessAlert = useCallback((message: string, timer: number = 1500) => {
        Swal.fire({
            position: 'top',
            icon: 'success',
            title: message,
            showConfirmButton: false,
            timer: timer,
            color: colors.sideNavBarBG,
        });
    }, []);
    return { showSuccessAlert, showErrorAlert };
};

export default useAlert;
