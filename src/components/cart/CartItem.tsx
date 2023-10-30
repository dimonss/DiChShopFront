import React, { useCallback, useState } from 'react';
import colors from 'layout/colors';
import Box from '@mui/material/Box';
import config from 'config';
import DeleteIcon from '@mui/icons-material/Delete';
import { ReactComponent as DecrementIcon } from 'images/decrement.svg';
import { ReactComponent as IncrementIcon } from 'images/increment.svg';
import { decrementProduct, deleteFromCart, incrementProduct } from 'api/privateAPI';
import { API_RESPONSE_STATUS } from 'api/statuses';
import Swal from 'sweetalert2';
import strings from 'constants/strings';
import { ProductStateI } from 'redux/types/productTypes';
import LocalLoader, { LOCAL_LOADER_SIZES } from 'components/reusable/loaders/LocalLoader';

const counterButtonStyles = {
    display: 'flex',
    background: colors.iconActiveColor,
    borderRadius: '8px',
    width: '30px',
    height: '30px',
    alignItems: 'center',
    justifyContent: 'center',
};

interface PropI {
    data: ProductStateI;
    deleteItemCallback: (id: number) => void;
}

const CartItem: React.FC<PropI> = ({ data, deleteItemCallback }) => {
    const [counter, setCounter] = useState<number>(data.counter || 1);
    const [isLoading, setIsLoading] = useState(false);
    const deleteProductFromCart = useCallback(async (id: number) => {
        setIsLoading(true);
        await deleteFromCart(id)
            .then((res) => {
                if (res?.data?.status === API_RESPONSE_STATUS.OK) {
                    deleteItemCallback(id);
                } else {
                    Swal.fire({
                        position: 'top',
                        icon: 'error',
                        title: res?.data?.message,
                        showConfirmButton: false,
                        timer: 1500,
                        color: colors.sideNavBarBG,
                    });
                }
            })
            .catch((e) => {
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: e?.response?.data?.message || strings.unknown_error,
                    showConfirmButton: false,
                    timer: 1500,
                    color: colors.sideNavBarBG,
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const increment = useCallback(async () => {
        setIsLoading(true);
        await incrementProduct(data?.id)
            .then((res) => {
                if (res?.data?.status === API_RESPONSE_STATUS.OK) {
                    setCounter(res?.data?.data);
                } else {
                    Swal.fire({
                        position: 'top',
                        icon: 'error',
                        title: res?.data?.message,
                        showConfirmButton: false,
                        timer: 1500,
                        color: colors.sideNavBarBG,
                    });
                }
            })
            .catch((e) => {
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: e?.response?.data?.message || strings.unknown_error,
                    showConfirmButton: false,
                    timer: 1500,
                    color: colors.sideNavBarBG,
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [counter, data.id]);

    const decrement = useCallback(async () => {
        setIsLoading(true);
        await decrementProduct(data?.id)
            .then((res) => {
                if (res?.data?.status === API_RESPONSE_STATUS.OK) {
                    setCounter(res?.data?.data);
                } else {
                    Swal.fire({
                        position: 'top',
                        icon: 'error',
                        title: res?.data?.message,
                        showConfirmButton: false,
                        timer: 1500,
                        color: colors.sideNavBarBG,
                    });
                }
            })
            .catch((e) => {
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: e?.response?.data?.message || strings.unknown_error,
                    showConfirmButton: false,
                    timer: 1500,
                    color: colors.sideNavBarBG,
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [counter, data.id]);

    return (
        <Box
            key={data.id}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px',
                height: '72px',
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                marginBottom: '18px',
                background: colors.cardBG,
                borderRadius: '15px',
                overflow: 'hidden',
            }}>
            <Box
                sx={{
                    width: '76px',
                    height: '76px',
                    borderRadius: '15px',
                    overflow: 'hidden',
                    float: 'left',
                    backgroundImage: `url(${config.STATIC_PATH}${data?.img})`,
                    noRepeat: 'center top',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'space-around',
                }}>
                <Box mb="8px" sx={{ fontSize: '14px', lineHeight: '160%' }}>
                    {data?.title}
                </Box>
                <Box mb="8px" sx={{ fontSize: '12px', lineHeight: '145%' }}>
                    {data?.title}
                </Box>
                <Box sx={{ fontSize: '15px', lineHeight: '115%' }}>
                    <b>{data?.sellingPrice + 'c'}</b>
                </Box>
            </Box>
            <Box
                sx={{
                    position: 'relative',
                    background: colors.costBG,
                    display: 'flex',
                    width: '90px',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderRadius: '16px',
                }}>
                <Box
                    sx={counterButtonStyles}
                    onClick={() => {
                        if (counter === 1) {
                            deleteProductFromCart(data?.id);
                            return;
                        }
                        if (counter > 0) decrement();
                    }}>
                    {counter === 1 ? (
                        <DeleteIcon fontSize="small" sx={{ color: colors.red }} />
                    ) : counter === -1 ? (
                        <h1>loading</h1>
                    ) : (
                        <DecrementIcon />
                    )}
                </Box>
                {isLoading ? (
                    <Box sx={{ position: 'absolute', left: '6px', top: '-25px' }}>
                        <LocalLoader size={LOCAL_LOADER_SIZES.XS} />
                    </Box>
                ) : (
                    counter
                )}

                <Box
                    sx={counterButtonStyles}
                    onClick={() => {
                        increment();
                    }}>
                    <IncrementIcon />
                </Box>
            </Box>
        </Box>
    );
};

export default CartItem;
