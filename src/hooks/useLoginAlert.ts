import { useCallback } from 'react';
import Swal from 'sweetalert2';
import Config from 'config';
import colors from 'layout/colors';
import strings from 'constants/strings';
import { parseTokenFromText } from 'utils/mainUtils';
import { useAppDispatch } from 'types/globalTypes';
import { loginUser } from 'redux/slices/userSlice';

const useLoginAlert = (title: string) => {
    const dispatch = useAppDispatch();

    const successCallback = useCallback(() => {
        Swal.fire({
            position: 'top',
            icon: 'success',
            title: strings.you_are_success_authorized,
            showConfirmButton: false,
            timer: 1500,
        });
    }, []);

    const pasteTokenFromClipboard = useCallback(async () => {
        try {
            const clipboardText = await navigator.clipboard.readText();
            const token = parseTokenFromText(clipboardText);
            
            if (token) {
                dispatch(loginUser({ token, successCallback }));
            } else {
                Swal.fire({
                    title: strings.error,
                    text: strings.invalid_token_format,
                    icon: 'error',
                    confirmButtonColor: colors.iconActiveColor,
                });
            }
        } catch (error) {
            Swal.fire({
                title: strings.error,
                text: strings.clipboard_access_error,
                icon: 'error',
                confirmButtonColor: colors.iconActiveColor,
            });
        }
    }, [dispatch, successCallback]);

    const loginAlert = useCallback(() => {
        Swal.fire({
            title: title,
            text: strings.auth_telegram_bot_text,
            icon: 'warning',
            showCancelButton: true,
            showDenyButton: true,
            confirmButtonColor: colors.iconActiveColor,
            cancelButtonColor: colors.red,
            denyButtonColor: colors.iconActiveColor,
            cancelButtonText: strings.cancel,
            confirmButtonText: strings.open_bot,
            denyButtonText: strings.paste_token,
        }).then((result) => {
            if (result.isConfirmed) {
                window.open('https://t.me/' + Config.BOT_NAME, '_blank');
            } else if (result.isDenied) {
                pasteTokenFromClipboard();
            } else {
                Swal.fire({
                    title: strings.auth_sad_face,
                    text: strings.auth_sad_text,
                    icon: 'question',
                    confirmButtonColor: colors.iconActiveColor,
                    iconColor: colors.iconActiveColor,
                });
            }
        });
    }, [pasteTokenFromClipboard]);
    return { loginAlert };
};

export default useLoginAlert;
