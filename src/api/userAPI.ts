import axios, { AxiosInstance } from 'axios';
import * as ep from './endpoints';
import { BasicResponse } from './types/dto';
import { UserStateI } from 'redux/types/userTypes';

export const contentAPI: AxiosInstance = axios.create({
    headers: {
        'content-type': 'application/json',
    },
});

export const getClient = (token: string) =>
    contentAPI.get<BasicResponse<UserStateI>>(ep.CLIENT, { headers: { auth: token } });
