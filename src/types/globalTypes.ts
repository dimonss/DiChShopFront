import { reducer } from 'redux/store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export type NullableString = string | null;
export type NullableNumber = number | null;

export type RootState = ReturnType<typeof reducer>;

export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
