import { ActionReducerMapBuilder, AsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoadingKeys, LoadingState } from '../types/loadingTypes';
import { loginUser } from './userSlice';
import { fetchCategory, fetchNotification, fetchProduct } from 'redux/slices/contentSlice';

type AsyncAction = {
    [K in LoadingKeys]: any;
};

const initialState: LoadingState = {
    user: false,
    product: false,
    category: false,
    notification: false,
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
    builder
        .addCase(asyncAction.pending, (state) => {
            state[key] = true;
        })
        .addCase(asyncAction.fulfilled, (state) => {
            state[key] = false;
        })
        .addCase(asyncAction.rejected, (state) => {
            state[key] = false;
        });
};

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        loadingSetInitialState: () => initialState,
    },
    extraReducers: (builder) => {
        Object.keys(asyncActions).forEach((key) => {
            trackActionState(builder, key, asyncActions[key as keyof AsyncAction]);
        });
    },
});

export const { loadingSetInitialState } = loadingSlice.actions;
