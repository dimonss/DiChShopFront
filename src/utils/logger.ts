import config from 'config';
import amplitude from 'amplitude-js';

export const AmplitudeEvents = {
    MAIN_PAGE: 'main_page',
    DETAIL_PRODUCT_PAGE: 'detail_product_page',
    CART_PAGE: 'cart_page',
    FAVORITE_PAGE: 'favorite_page',
    NOTIFICATION_PAGE: 'notification_page',
    ADD_TO_FAVORITE: 'add_to_favorite',
    DELETE_FROM_FAVORITE: 'delete_from_favorite',
    ADD_TO_CART: 'add_to_cart',
    DELETE_FROM_CART: 'delete_from_cart',
    BUY_CART: 'buy_cart',
};

export const init = (amplutudeId: string) => {
    amplitude.getInstance().init(amplutudeId);
};

export const setUserId = (userId: string) => {
    amplitude.getInstance().setUserId(userId);
};

export const logEvent = (eventName: string, props?: object) => {
    if (!config.isProduction()) {
        console.log(eventName);
        console.log(props || null);
        console.log('----------------');
    }
    amplitude.getInstance().logEvent(eventName, props || null);
};
