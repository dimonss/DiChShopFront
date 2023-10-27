import config from '../config';
import axios, { AxiosInstance } from 'axios';
import * as ep from './endpoints';
import { BasicResponse } from './types/dto';
import { ProductStateI } from 'redux/types/productTypes';

const baseURL = config.API_URL;

export const privateAPI: AxiosInstance = axios.create({
    baseURL,
    headers: {
        'content-type': 'application/json',
    },
});
export const findProductWithAuth = (searchText: string) =>
    privateAPI.get<BasicResponse<ProductStateI[]>>(ep.PRODUCT_SEARCH_WITH_AUTH + searchText);
export const getProductWithAuth = () =>
    privateAPI.get<BasicResponse<ProductStateI>>(ep.PRODUCT_WITH_AUTH);
export const getProductByIdWithAuth = (id: string) =>
    privateAPI.get<BasicResponse<ProductStateI>>(ep.PRODUCT_WITH_AUTH + id);

//CART
export const getCart = () => privateAPI.get<BasicResponse<ProductStateI>>(ep.CART);
export const addToCart = (productId: number) =>
    privateAPI.post<BasicResponse<ProductStateI>>(ep.CART + '/' + productId);
export const deleteFromCart = (productId: number) =>
    privateAPI.delete<BasicResponse<ProductStateI>>(ep.CART + '/' + productId);

//FAVORITE
export const getFavorite = () => privateAPI.get<BasicResponse<ProductStateI>>(ep.FAVORITE);
export const addToFavorite = (productId: number) =>
    privateAPI.post<BasicResponse<ProductStateI>>(ep.FAVORITE + '/' + productId);
export const deleteFromFavorite = (productId: number) =>
    privateAPI.delete<BasicResponse<ProductStateI>>(ep.FAVORITE + '/' + productId);
