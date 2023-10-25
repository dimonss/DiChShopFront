import { useCallback } from 'react';
import Swal from 'sweetalert2';
import colors from 'layout/colors';
import useResetStore from 'hooks/useResetStore';
import strings from 'constants/strings';

const useLogoutAlert = () => {
    const resetStore = useResetStore();
    const logoutAlert = useCallback(() => {
        Swal.fire({
            title: strings.are_yoy_sure_logout,
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: strings.cancel,
            confirmButtonText: strings.yes_logout,
            confirmButtonColor: colors.iconActiveColor,
            cancelButtonColor: colors.red,
        }).then((result) => {
            if (result.isConfirmed) {
                resetStore();
            }
        });
    }, []);
    return { logoutAlert };
};

export default useLogoutAlert;
