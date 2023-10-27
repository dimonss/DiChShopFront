import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'types/globalTypes';
import { clearError } from 'redux/slices/errorSlice';
import { ErrorKeys } from 'redux/types/errorTypes';
import { useSnackbar } from 'notistack';
import strings from 'constants/strings';
import useNetworkStatus from 'hooks/useNetworkStatus';
import SignalWifiConnectedNoInternet4Icon from '@mui/icons-material/SignalWifiConnectedNoInternet4';

const UseGlobalErrorSnackbar = () => {
    const dispatch = useAppDispatch();
    const isOnline = useNetworkStatus();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const errors = useAppSelector((state) => state.errors);

    useEffect(() => {
        Object.keys(errors).map((key) => {
            if (errors[key as ErrorKeys].length) {
                enqueueSnackbar(errors[key as ErrorKeys], { variant: 'error' });
                dispatch(clearError(key as ErrorKeys));
            }
        });
    }, [dispatch, errors]);

    useEffect(() => {
        if (!isOnline) {
            enqueueSnackbar(
                <b>
                    <SignalWifiConnectedNoInternet4Icon sx={{ margin: '0px 20px -6px 0px' }} />
                    {strings.no_internet_connection}{' '}
                </b>,
                {
                    variant: 'error',
                    persist: true,
                    hideIconVariant: true,
                },
            );
        } else closeSnackbar();
    }, [isOnline]);
};

export default UseGlobalErrorSnackbar;
