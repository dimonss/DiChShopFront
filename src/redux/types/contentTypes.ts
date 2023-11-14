import { ProductStateI } from 'redux/types/productTypes';
import {NotificationI} from "api/types/notification";

export interface CategoryStateI {
    id: number;
    name: string;
}

export interface ContentStateI {
    readonly product: ProductStateI[];
    readonly category: CategoryStateI[];
    readonly notification: NotificationI[];
}

type ContentKeys = 'product' | 'category' | 'notification';

export type ContentAsyncActions = {
    [K in ContentKeys]: any;
};
