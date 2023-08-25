import { ProductStateI } from 'redux/types/productTypes';

export interface CategoryStateI {
    id: number;
    name: string;
}

export interface ContentStateI {
    readonly product: ProductStateI[];
    readonly category: CategoryStateI[];
}

type AMLKeys = 'product' | 'category';

export type ContentAsyncActions = {
    [K in AMLKeys]: any;
};
