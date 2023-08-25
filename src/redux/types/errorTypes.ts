import { LoadingKeys } from './loadingTypes';

export type ErrorKeys = LoadingKeys;

export type ErrorState = Readonly<{
    [K in ErrorKeys]: string;
}>;

export type AsyncAction = {
    [K in ErrorKeys]: any;
};
