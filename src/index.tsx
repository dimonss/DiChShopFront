import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from 'routes';
import store from 'redux/store';
import { Provider } from 'react-redux';
import TokenRefresher from 'components/TokenRefresher';
import { SnackbarProvider } from 'notistack';
import { init } from 'utils/logger';
import config from 'config';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const router = createBrowserRouter(routes);
init(config.AMPLITUDE);
root.render(
    <Provider store={store}>
        <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            preventDuplicate>
            <TokenRefresher />
            <RouterProvider router={router} />
        </SnackbarProvider>
    </Provider>,
);
