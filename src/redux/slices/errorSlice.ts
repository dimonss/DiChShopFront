import { ActionReducerMapBuilder, AsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';
import { AsyncAction, ErrorState } from '../types/errorTypes';
import { loginUser } from './userSlice';
import { fetchCategory, fetchNotification, fetchProduct } from 'redux/slices/contentSlice';

const initialState: ErrorState = {
    user: '',
    product: '',
    category: '',
    notification: '',
};

export const asyncActions: AsyncAction = {
    user: loginUser,
    product: fetchProduct,
    category: fetchCategory,
    notification: fetchNotification,
};

export const trackActionState = (
    builder: ActionReducerMapBuilder<any>,
    key: string,
    asyncAction: AsyncThunk<any, any, { rejectValue: string; state?: any }>,
) => {
    builder.addCase(asyncAction.rejected, (state, { payload }) => {
        state[key] = payload;
    });
};

export const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        clearError: (state, { payload }: PayloadAction<keyof ErrorState>) => {
            state[payload] = '';
        },
        errorSetInitialState: () => initialState,
    },
    extraReducers: (builder) => {
        Object.keys(asyncActions).forEach((key) => {
            trackActionState(builder, key, asyncActions[key as keyof AsyncAction]);
        });
    },
});

export const { clearError, errorSetInitialState } = errorSlice.actions;
