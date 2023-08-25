import { userSetInitialState } from 'redux/slices/userSlice';
import { loadingSetInitialState } from 'redux/slices/loadingSlice';
import { errorSetInitialState } from 'redux/slices/errorSlice';
import { contentSetInitialState } from 'redux/slices/contentSlice';
import { appSetInitialState } from 'redux/slices/appSlice';
import { useAppDispatch } from 'types/globalTypes';

const useResetStore = () => {
    const dispatch = useAppDispatch();
    return () => {
        dispatch(appSetInitialState());
        dispatch(contentSetInitialState());
        dispatch(errorSetInitialState());
        dispatch(loadingSetInitialState());
        dispatch(userSetInitialState());
    };
};

export default useResetStore;
