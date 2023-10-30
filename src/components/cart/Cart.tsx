import React, { useCallback, useEffect, useState } from 'react';
import { API_RESPONSE_STATUS } from 'api/statuses';
import { getApiErrorMessage, getResponseErrorMessage } from 'api/utils';
import { getCart } from 'api/privateAPI';
import { ProductStateI } from 'redux/types/productTypes';
import { useAppSelector } from 'types/globalTypes';
import Box from '@mui/material/Box';
import colors from 'layout/colors';
import LocalLoader, { LOCAL_LOADER_SIZES } from 'components/reusable/loaders/LocalLoader';
import strings from 'constants/strings';
import { TransitionGroup } from 'react-transition-group';
import Collapse from '@mui/material/Collapse';

import CartItem from 'components/cart/CartItem';

const Cart = () => {
    const { loggedIn } = useAppSelector((state) => state.user);
    const [cart, setCart] = useState<ProductStateI[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (loggedIn) {
            setIsLoading(true);
            getCart()
                .then((res) => {
                    if (res.data.status === API_RESPONSE_STATUS.OK) {
                        setCart(res.data.data);
                    } else {
                        setError(getResponseErrorMessage(res));
                    }
                })
                .catch((e) => {
                    setError(getApiErrorMessage(e));
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, []);
    const deleteCallbackItem = useCallback(
        (id: number) => {
            setCart((prev) => prev.filter((item) => item?.id !== id));
        },
        [cart],
    );

    const placeOrder = useCallback(() => {}, []);
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                color: colors.white,
                width: '100%',
            }}>
            <h3 style={{ fontWeight: 400, margin: '46px 0 4px 0' }}>Cart</h3>
            <Box p={'16px'}>
                {isLoading ? (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <LocalLoader size={LOCAL_LOADER_SIZES.L} />
                    </Box>
                ) : cart?.length ? (
                    <TransitionGroup>
                        {cart?.map((item) => (
                            <Collapse key={item.id}>
                                <CartItem data={item} deleteItemCallback={deleteCallbackItem} />
                            </Collapse>
                        ))}
                    </TransitionGroup>
                ) : (
                    <h1>Корзина пуста</h1>
                )}
                <Box
                    sx={{
                        borderBottom: 'dashed rgba(255, 255, 255, 0.20) 2px',
                        borderTop: 'dashed rgba(255, 255, 255, 0.20) 2px',
                    }}>
                    sss
                </Box>
                <Box
                    onClick={placeOrder}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '10px',
                        textTransform: 'uppercase',
                        background: colors.iconActiveColor,
                        color: colors.text,
                        minWidth: '72%',
                        fontSize: '16px',
                        height: '45px',
                    }}>
                    {isLoading ? (
                        <LocalLoader size={LOCAL_LOADER_SIZES.XS} />
                    ) : (
                        <b>{strings.place_order}</b>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default Cart;
