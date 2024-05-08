import { ProductStateI } from 'redux/types/productTypes';

export const PRODUCT_DEFAULT_VALUES: ProductStateI = {
    id: -1,
    title: '',
    subtitle: '',
    description: '',
    price: 0,
    sellingPrice: 0,
    img: '',
    rating: 0,
    inCart: false,
    favorite: false,
};

export const PATH_TO_IMAGE = 'static/images/';
