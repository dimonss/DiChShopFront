import React, { useCallback, useEffect, useState } from 'react';
import { API_RESPONSE_STATUS } from 'api/statuses';
import { getApiErrorMessage, getResponseErrorMessage } from 'api/utils';
import { buyCartCart, getCart } from 'api/privateAPI';
import { ProductStateI } from 'redux/types/productTypes';
import { useAppSelector } from 'types/globalTypes';
import Box from '@mui/material/Box';
import colors from 'layout/colors';
import LocalLoader, { LOCAL_LOADER_SIZES } from 'components/reusable/loaders/LocalLoader';
import strings from 'constants/strings';
import { TransitionGroup } from 'react-transition-group';
import Collapse from '@mui/material/Collapse';
import URLS from 'constants/urls';
import CartItem from 'components/cart/CartItem';
import { useNavigate } from 'react-router-dom';
import useAlert from 'hooks/useAlert';
import LoginButton from 'components/reusable/buttons/LoginButton';
import { AmplitudeEvents, logEvent } from 'utils/logger';

const Cart = () => {
    const { loggedIn, discount, id: userId } = useAppSelector((state) => state.user);
    const [cart, setCart] = useState<ProductStateI[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [cartCheckoutIsLoading, setCartCheckoutIsLoading] = useState(false);
    const [totalSum, setTotalSum] = useState(0);

    const navigate = useNavigate();
    const { showErrorAlert, showSuccessAlert } = useAlert();

    useEffect(() => {
        if (error) {
            showErrorAlert(error);
            setError('');
        }
    }, [error]);

    useEffect(() => {
        const initialValue = 0;
        setTotalSum(
            cart.reduce((sum, item) => sum + item?.sellingPrice * (item?.counter || 1), initialValue),
        );
    }, [cart]);

    useEffect(() => {
        if (loggedIn) {
            setIsLoading(true);
            getCart()
                .then((res) => {
                    if (res?.data?.status === API_RESPONSE_STATUS.OK) {
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
        logEvent(AmplitudeEvents.CART_PAGE);
    }, []);
    const deleteCallbackItem = useCallback((id: number) => {
        setCart((prev) => prev.filter((item) => item?.id !== id));
    }, []);
    const changeAmount = useCallback((id: number, counter: number) => {
        setCart((prev) => prev?.map((item) => (item?.id === id ? { ...item, counter } : item)));
    }, []);

    const placeOrder = useCallback(() => {
        if (cart.length) {
            setCartCheckoutIsLoading(true);
            buyCartCart()
                .then((res) => {
                    if (res?.data?.status === API_RESPONSE_STATUS.OK) {
                        showSuccessAlert(res?.data?.message, 5000);
                        logEvent(AmplitudeEvents.BUY_CART, {
                            cart: cart?.map((item) => ({
                                productId: item?.id,
                                counter: item?.counter,
                                title: item?.title,
                            })),
                            userId,
                        });
                        navigate(URLS.HOME);
                    } else {
                        setError(getResponseErrorMessage(res));
                    }
                })
                .catch((e) => {
                    setError(getApiErrorMessage(e));
                })
                .finally(() => {
                    setCartCheckoutIsLoading(false);
                });
        }
    }, [cart]);
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                color: colors.white,
                width: '100%',
            }}>
            <Box p={'16px'}>
                <h3 style={{ fontWeight: 400, margin: '14px 0' }}>{strings.cart}</h3>
                <Box sx={{ height: 'calc(100svh - 380px)', overflowY: 'scroll', borderRadius: '15px' }}>
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
                                    <CartItem
                                        data={item}
                                        deleteItemCallback={deleteCallbackItem}
                                        changeAmountCallback={changeAmount}
                                    />
                                </Collapse>
                            ))}
                        </TransitionGroup>
                    ) : (
                        <>
                            <h3>
                                {loggedIn
                                    ? 'У вас еще нет товаров в корзине'
                                    : 'Для использования корзины необходимо авторизоваться'}
                            </h3>
                            {!loggedIn && <LoginButton />}
                        </>
                    )}
                </Box>

                <Box
                    sx={{
                        borderBottom: 'dashed rgba(255, 255, 255, 0.20) 1px',
                        borderTop: 'dashed rgba(255, 255, 255, 0.20) 1px',
                        padding: '20px 0',
                        margin: '20px 0',
                    }}>
                    <Box
                        sx={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'space-between',
                            fontSize: '14px',
                            lineHeight: '125%',
                        }}>
                        <Box>Сумма</Box>
                        <Box>
                            <b>{totalSum + 'c'}</b>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'space-between',
                            fontSize: '14px',
                            lineHeight: '125%',
                        }}>
                        <Box>Скидка</Box>
                        <Box>
                            <b>{(totalSum / 100) * discount + 'c'}</b>
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'space-between',
                        fontSize: '20px',
                        margin: '28px 0',
                        fontFamily: 'semibold',
                    }}>
                    <Box>Итого</Box>
                    <Box>
                        <b>{totalSum - (totalSum / 100) * discount + 'c'}</b>
                    </Box>
                </Box>
                <Box
                    onClick={placeOrder}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '10px',
                        textTransform: 'uppercase',
                        background: isLoading ? colors.sideNavBarBG : colors.iconActiveColor,
                        color: colors.text,
                        minWidth: '72%',
                        fontSize: '16px',
                        height: '45px',
                        opacity: cart?.length ? 1 : 0.2,
                    }}>
                    {isLoading || cartCheckoutIsLoading ? (
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
