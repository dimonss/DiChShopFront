import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { loadState, saveState } from 'utils/localStorageUtils';
import config from '../config';
import { userSlice } from './slices/userSlice';
import { contentSlice } from 'redux/slices/contentSlice';
import { appSlice } from './slices/appSlice';
import { errorSlice } from './slices/errorSlice';
import { loadingSlice } from './slices/loadingSlice';

const loadedState = loadState();

export const reducer = combineReducers({
    user: userSlice.reducer,
    content: contentSlice.reducer,
    app: appSlice.reducer,
    errors: errorSlice.reducer,
    loading: loadingSlice.reducer,
});
const store = configureStore({
    reducer: reducer,
    preloadedState: loadedState,
    devTools: !config.isProduction(),
});

store.subscribe(() => {
    saveState(store.getState());
});

export default store;
