import config from '../config';
import axios, { AxiosInstance } from 'axios';
import * as ep from './endpoints';
import { BasicResponse } from './types/dto';
import { ProductStateI } from 'redux/types/productTypes';
import { CategoryStateI } from 'redux/types/contentTypes';

const baseURL = config.API_URL;

export const contentAPI: AxiosInstance = axios.create({
    baseURL,
    headers: {
        'content-type': 'application/json',
    },
});

export const getProduct = () => contentAPI.get<BasicResponse<ProductStateI[]>>(ep.PRODUCT);
export const getCategory = () => contentAPI.get<BasicResponse<CategoryStateI[]>>(ep.CATEGORY);
