import { createSlice } from '@reduxjs/toolkit';
import config from 'config';

interface VersionState {
    stateVersion: number;
}

const initialState: VersionState = {
    stateVersion: config.stateVersion,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        appSetInitialState: () => initialState,
    },
});

export const { appSetInitialState } = appSlice.actions;
