import App from 'components/App';
import Cart from 'components/cart/Cart';
import ProductDetail from 'components/product/ProductDetail';
import React from 'react';
import URLS from 'constants/urls';
import AboutUser from 'components/aboutUser/AboutUser';
import Content from 'components/content/Content';
import { Container } from '@mui/material';

const routes = [
    {
        path: '/',
        element: <App />,
        errorElement: <h1>ERROR</h1>,
        children: [
            {
                path: '/',
                element: (
                    <Container>
                        <AboutUser />
                        <Content />
                    </Container>
                ),
                errorElement: <h1>ERROR_LECEL_2</h1>,
            },
            {
                path: 'cart',
                element: <Cart />,
                errorElement: <h1>ERROR_LECEL_2</h1>,
            },
            {
                path: 'favorite',
                element: <h3>{'favorite'}</h3>,
                errorElement: <h1>ERROR_LECEL_2</h1>,
            },
            {
                path: 'notifications',
                element: <h3>{'notifications'}</h3>,
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
