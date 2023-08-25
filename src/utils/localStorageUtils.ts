import config from 'config';
import { RootState } from 'types/globalTypes';

const LOCALSTORAGE_KEY = 'DiChApp';

export const saveState = (state: any) => {
    try {
        const serializedState = JSON.stringify({
            ...state,
            errors: undefined,
        });
        localStorage.setItem(LOCALSTORAGE_KEY, serializedState);
    } catch (err: any) {
        new Error(err);
    }
};

export const loadState = (): RootState | undefined => {
    try {
        const serializedState = localStorage.getItem(LOCALSTORAGE_KEY);
        if (serializedState === null) {
            return undefined;
        }
        const state: RootState = JSON.parse(serializedState);
        if (state.app?.stateVersion === undefined || config.stateVersion !== state.app.stateVersion) {
            return undefined;
        }
        return state;
    } catch (err) {
        return undefined;
    }
};
