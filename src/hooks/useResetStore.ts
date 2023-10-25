import { userSetInitialState } from 'redux/slices/userSlice';
import { loadingSetInitialState } from 'redux/slices/loadingSlice';
import { errorSetInitialState } from 'redux/slices/errorSlice';
import { appSetInitialState } from 'redux/slices/appSlice';
import { contentSetInitialState } from 'redux/slices/contentSlice';
import { useAppDispatch } from 'types/globalTypes';

const useResetStore = () => {
    const dispatch = useAppDispatch();
    return () => {
        dispatch(appSetInitialState());
        dispatch(errorSetInitialState());
        dispatch(loadingSetInitialState());
        dispatch(userSetInitialState());
        dispatch(contentSetInitialState());
    };
};

export default useResetStore;
