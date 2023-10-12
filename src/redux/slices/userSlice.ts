import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';
import { UserStateI } from 'redux/types/userTypes';
import { getClient } from 'api/userAPI';
import { API_RESPONSE_STATUS } from 'api/statuses';

const initialState: UserStateI = {
    firstname: '',
    lastname: '',
    login: '',
    photo: '',
    loggedIn: false,
    loading: false,
};

export const loginUser = createAsyncThunk('user/login', async (id: number, { rejectWithValue }) => {
    try {
        const response = await getClient(id);
        if (response.data.status === API_RESPONSE_STATUS.OK) {
            return response.data.data;
        } else {
            return rejectWithValue('unknown error');
        }
    } catch (e) {
        return rejectWithValue('unknown error');
    }
});

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
            const { firstname, lastname, login, photo } = payload;
            state.firstname = firstname;
            state.lastname = lastname;
            state.login = login;
            state.photo = photo;
            state.loggedIn = true;
        });
        builder.addCase(loginUser.rejected, (state) => {
            state.loading = false;
        });
    },
});

export const { userSetInitialState } = userSlice.actions;
