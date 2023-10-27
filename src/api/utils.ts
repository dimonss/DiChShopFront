import axios, { AxiosResponse } from 'axios';
import { BasicResponse } from 'api/types/dto';
import strings from 'constants/strings';

export const getResponseErrorMessage = (response: AxiosResponse<BasicResponse<any>>): string => {
    return response.data?.message || strings.unknown_error;
};
export const getApiErrorMessage = (e: any): string => {
    try {
        if (axios.isAxiosError(e)) {
            return e.response?.data?.error || e.message;
        }
        return strings.unknown_error;
    } catch (error) {
        return strings.unknown_error;
    }
};
