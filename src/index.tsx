import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from 'routes';
import store from 'redux/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const router = createBrowserRouter(routes);

root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>,
);
