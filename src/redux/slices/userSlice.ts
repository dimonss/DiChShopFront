import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';
import { UserStateI } from 'redux/types/userTypes';
import { getClient } from 'api/userAPI';
import { API_RESPONSE_STATUS } from 'api/statuses';
import { getApiErrorMessage, getResponseErrorMessage } from 'api/utils';

const initialState: UserStateI = {
    firstname: '',
    lastname: '',
    login: '',
    photo: '',
    token: '',
    loggedIn: false,
    loading: false,
};

export const loginUser = createAsyncThunk(
    'user/login',
    async (
        { token, successCallback }: { token: string; successCallback: () => void },
        { rejectWithValue },
    ) => {
        try {
            const response = await getClient(token);
            if (response.data.status === API_RESPONSE_STATUS.OK) {
                successCallback();
                return response.data.data;
            } else {
                return rejectWithValue(getResponseErrorMessage(response));
            }
        } catch (e) {
            return rejectWithValue(getApiErrorMessage(e));
        }
    },
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userSetInitialState: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, { payload }: PayloadAction<UserStateI>) => {
            const { firstname, lastname, login, photo, token } = payload;
            state.firstname = firstname;
            state.lastname = lastname;
            state.login = login;
            state.photo = photo;
            state.loggedIn = true;
            state.token = token;
        });
        builder.addCase(loginUser.rejected, (state) => {
            state.loading = false;
        });
    },
});

export const { userSetInitialState } = userSlice.actions;
