import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from 'routes';
import store from 'redux/store';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { init } from 'utils/logger';
import config from 'config';
import PWAWrapper from 'components/PWAWrapper';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const router = createBrowserRouter(routes, {basename: '/shop'});
init(config.AMPLITUDE);
root.render(
    <Provider store={store}>
        <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            preventDuplicate>
            <PWAWrapper>
                <RouterProvider router={router} />
            </PWAWrapper>
        </SnackbarProvider>
    </Provider>,
);
