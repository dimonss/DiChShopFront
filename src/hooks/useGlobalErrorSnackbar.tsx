import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'types/globalTypes';
import { clearError } from 'redux/slices/errorSlice';
import { ErrorKeys } from 'redux/types/errorTypes';
import { useSnackbar } from 'notistack';
import strings from 'constants/strings';
import useNetworkStatus from 'hooks/useNetworkStatus';

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
            enqueueSnackbar(strings.no_internet_connection, {
                variant: 'error',
                persist: true,
            });
        } else closeSnackbar();
    }, [isOnline]);
};

export default UseGlobalErrorSnackbar;
