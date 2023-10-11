import App from 'components/App';
import Cart from 'components/cart/Cart';
import React from 'react';

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
                element: <Cart />,
                errorElement: <h1>ERROR_LECEL_2</h1>,
            },
        ],
    },
];

export default routes;
