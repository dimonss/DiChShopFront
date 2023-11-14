import { ActionReducerMapBuilder, AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_RESPONSE_STATUS } from 'api/statuses';
import { getApiErrorMessage, getResponseErrorMessage } from 'api/utils';
import { getCategory, getProduct } from 'api/contentAPI';
import { ContentAsyncActions, ContentStateI } from 'redux/types/contentTypes';
import { NullableString } from 'types/globalTypes';
import { getNotifications, getProductWithAuth } from 'api/privateAPI';

const initialState: ContentStateI = {
    product: [],
    category: [],
    notification: [],
};

export const trackActionState = (
    builder: ActionReducerMapBuilder<any>,
    key: string,
    asyncAction: AsyncThunk<any, any, { rejectValue: string; state?: any }>,
) => {
    builder.addCase(asyncAction.fulfilled, (state, { payload }) => {
        state[key] = payload;
    });
};

/////////////////////////////////

export const fetchProduct = createAsyncThunk(
    'content/fetchProduct',
    async (
        {
            search = null,
            categoryId,
            loggedIn,
        }: {
            search?: NullableString;
            categoryId?: NullableString;
            loggedIn: boolean;
        },
        { rejectWithValue },
    ) => {
        categoryId = categoryId === '-1' ? '' : categoryId;
        try {
            const res = loggedIn
                ? await getProductWithAuth({ search, categoryId })
                : await getProduct({ search, categoryId });
            if (res?.data?.status === API_RESPONSE_STATUS.OK) {
                return res?.data?.data;
            } else if (res?.data?.status === API_RESPONSE_STATUS.NOT_FOUND) {
                return [];
            } else {
                return rejectWithValue(getResponseErrorMessage(res));
            }
        } catch (e) {
            return rejectWithValue(getApiErrorMessage('unknown error'));
        }
    },
);

export const fetchCategory = createAsyncThunk('content/fetchCategory', async (_, { rejectWithValue }) => {
    try {
        const res = await getCategory();
        if (res?.data?.status === API_RESPONSE_STATUS?.OK) {
            return res?.data?.data;
        } else {
            return rejectWithValue(getCategory());
        }
    } catch (e) {
        return rejectWithValue('unknown error');
    }
});

export const fetchNotification = createAsyncThunk(
    'content/fetchNotification',
    async (_, { rejectWithValue }) => {
        try {
            const res = await getNotifications();
            if (res?.data?.status === API_RESPONSE_STATUS?.OK) {
                return res?.data?.data;
            } else {
                return rejectWithValue(getCategory());
            }
        } catch (e) {
            return rejectWithValue('unknown error');
        }
    },
);
/////////////////////

export const contentAsyncActions: ContentAsyncActions = {
    product: fetchProduct,
    category: fetchCategory,
    notification: fetchNotification ,
};

export const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        contentSetInitialState: () => initialState,
    },
    extraReducers: (builder) => {
        Object.keys(contentAsyncActions).forEach((key) => {
            trackActionState(builder, key, contentAsyncActions[key as keyof ContentAsyncActions]);
        });
    },
});

export const { contentSetInitialState } = contentSlice.actions;
