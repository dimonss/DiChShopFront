import axios, { AxiosResponse } from 'axios';
import { BasicResponse } from 'api/types/dto';

export const getResponseErrorMessage = (response: AxiosResponse<BasicResponse<any>>): string => {
    return response.data?.message || 'Неизвестная ошибка';
};
export const getApiErrorMessage = (e: any): string => {
    try {
        if (axios.isAxiosError(e)) {
            return e.response?.data?.error || e.message;
        }
        return 'unknown_error';
    } catch (error) {
        return 'unknown_error';
    }
};
