import { useCallback } from 'react';
import Swal from 'sweetalert2';
import Config from 'config';
import colors from 'layout/colors';
import strings from 'constants/strings';

const useLoginAlert = (title: string) => {
    const loginAlert = useCallback(() => {
        Swal.fire({
            title: title,
            text: 'Для авторизации используйте наш Телеграм бот',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: colors.iconActiveColor,
            cancelButtonColor: colors.red,
            cancelButtonText: strings.cancel,
            confirmButtonText: strings.open_bot,
        }).then((result) => {
            if (result.isConfirmed) {
                window.open('https://t.me/' + Config.BOT_NAME, '_blank');
            } else {
                Swal.fire({
                    title: '😔',
                    text: 'Жаль что вы не захотели авторизоваться. \nУ нас очень простой процесс регистрации и авторизации!',
                    icon: 'question',
                    confirmButtonColor: colors.iconActiveColor,
                    iconColor: colors.iconActiveColor,
                });
            }
        });
    }, []);
    return { loginAlert };
};

export default useLoginAlert;
