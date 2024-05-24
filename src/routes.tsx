import App from 'components/App';
import Cart from 'components/cart/Cart';
import ProductDetail from 'components/product/ProductDetail';
import React from 'react';
import URLS from 'constants/urls';
import AboutUser from 'components/aboutUser/AboutUser';
import Content from 'components/content/Content';
import { Container } from '@mui/material';
import Favorite from 'components/favorites/Favorites';
import Notification from 'components/notification/Notification';
import ErrorView from 'components/error/ErrorView';

const routes = [
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorView/>,
        children: [
            {
                path: '/',
                element: (
                    <Container>
                        <AboutUser />
                        <Content />
                    </Container>
                ),
                errorElement: <ErrorView/>,
            },
            {
                path: 'cart',
                element: <Cart />,
                errorElement: <ErrorView/>,
            },
            {
                path: 'favorite',
                element: <Favorite />,
                errorElement: <ErrorView/>,
            },
            {
                path: 'notifications',
                element: <Notification />,
                errorElement: <ErrorView/>,
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
