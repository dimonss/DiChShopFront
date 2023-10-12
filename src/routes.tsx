import App from 'components/App';
import ProductDetail from 'components/product/ProductDetail';
import React from 'react';
import URLS from 'constants/urls';

const routes = [
    {
        path: '/',
        element: <App />,
        errorElement: <h1>ERROR</h1>,
        children: [
            {
                path: '/cappuccino',
                element: <h3>{'qwer'}</h3>,
                errorElement: <h1>ERROR_LECEL_2</h1>,
            },
            {
                path: '/cart',
                element: <h3>{'qwer'}</h3>,
                errorElement: <h1>ERROR_LECEL_2</h1>,
            },
        ],
    },
    {
        path: URLS.PRODUCT,
        element: <ProductDetail />,
        errorElement: <h1>ERROR</h1>,
    },
];

export default routes;
