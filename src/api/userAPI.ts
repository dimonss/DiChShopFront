import config from '../config';
import axios, { AxiosInstance } from 'axios';
import * as ep from './endpoints';
import { BasicResponse } from './types/dto';
import { UserStateI } from 'redux/types/userTypes';

const baseURL = config.API_URL;

export const contentAPI: AxiosInstance = axios.create({
    baseURL,
    headers: {
        'content-type': 'application/json',
    },
});

export const getClient = (id: number) => contentAPI.get<BasicResponse<UserStateI>>(ep.CLIENT + `/${id}`);
