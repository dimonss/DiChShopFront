import axios, { AxiosInstance } from 'axios';
import * as ep from './endpoints';
import { BasicResponse } from './types/dto';
import { ProductStateI } from 'redux/types/productTypes';
import { CategoryStateI } from 'redux/types/contentTypes';
import { productSearchParamsI } from 'types/apiTypes';

export const contentAPI: AxiosInstance = axios.create({
    headers: {
        'content-type': 'application/json',
    },
});

export const getProduct = (params: productSearchParamsI) =>
    contentAPI.get<BasicResponse<ProductStateI[]>>(ep.PRODUCT, { params });
export const getProductById = (id: string) =>
    contentAPI.get<BasicResponse<ProductStateI>>(ep.PRODUCT + id);
export const getCategory = () => contentAPI.get<BasicResponse<CategoryStateI[]>>(ep.CATEGORY);
