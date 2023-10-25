import React, { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import coffeeImage from 'images/content/coffee.png';
import colors from 'layout/colors';
import LocalLoader, { LOCAL_LOADER_SIZES } from 'components/reusable/loaders/LocalLoader';
import { Link } from 'react-router-dom';
import URLS from 'constants/urls';
import config from 'config';
import Swal from 'sweetalert2';
import strings from 'constants/strings';
import { addToCart, deleteFromCart } from 'api/privateAPI';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import CircularProgress from '@mui/material/CircularProgress';
import { API_RESPONSE_STATUS } from 'api/statuses';
import useLoginAlert from 'hooks/useLoginAlert';

interface PropI {
    id: number;
    image: string;
    name: string;
    cost: number;
    rating: number;
    isLoading?: boolean;
    loggedIn?: boolean;
    inCart?: boolean;
}

const CardProduct: React.FC<PropI> = ({
    id = 0,
    image = coffeeImage,
    name = 'Отсутствует',
    cost = 0,
    rating = 0,
    isLoading = true,
    inCart = false,
    loggedIn,
}) => {
    const [addingToCartIsLoading, setAddingToCartIsLoading] = useState(false);
    const [localInCart, setLocalInCart] = useState(inCart);
    useEffect(() => {
        setLocalInCart(inCart);
    }, [inCart]);//todo fix crutch

    const { loginAlert } = useLoginAlert(strings.you_are_not_authorized);

    const addToCartCallback = useCallback(async () => {
        setAddingToCartIsLoading(true);
        await addToCart(id)
            .then((res) => {
                if (res?.data?.status === API_RESPONSE_STATUS.OK) {
                    setLocalInCart(true);
                    Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: res?.data?.message,
                        showConfirmButton: false,
                        timer: 1500,
                        color: colors.sideNavBarBG,
                    });
                } else {
                    Swal.fire({
                        position: 'top',
                        icon: 'success',
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
                setAddingToCartIsLoading(false);
            });
    }, []);
    const deleteFromCartCallback = useCallback(async () => {
        setAddingToCartIsLoading(true);
        await deleteFromCart(id)
            .then((res) => {
                console.log(res);
                if (res?.data?.status === API_RESPONSE_STATUS.OK) {
                    setLocalInCart(false);
                    Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: res?.data?.message,
                        showConfirmButton: false,
                        timer: 1500,
                        color: colors.sideNavBarBG,
                    });
                } else {
                    Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: res?.data?.message,
                        showConfirmButton: false,
                        timer: 1500,
                        color: colors.sideNavBarBG,
                    });
                }
            })
            .catch((e) => {
                console.log(e);
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
                setAddingToCartIsLoading(false);
            });
    }, []);

    return (
        <Box
            p="14px"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '10px',
                background: colors.cardBG,
                margin: '0 12px 12px 0',
                justifyContent: 'space-between',
                height: '220px',
                cursor: 'pointer',
                position: 'relative',
            }}>
            {' '}
            {isLoading || (
                <Link
                    to={URLS.PRODUCT_RAW + id}
                    style={{
                        height: '190px',
                        position: 'absolute',
                        width: '100%',
                        zIndex: 1,
                        left: '0px',
                        top: '0px',
                    }}
                />
            )}
            <Box mb={'14px'} sx={{ overflow: 'hidden', position: 'relative' }}>
                {isLoading ? (
                    <LocalLoader size={LOCAL_LOADER_SIZES.M} />
                ) : (
                    <>
                        <Box
                            sx={{
                                height: '20px',
                                width: '44px',
                                position: 'absolute',
                                borderBottomRightRadius: '15px',
                                borderTopLeftRadius: '15px',
                                background: 'white',
                                opacity: '0.3',
                                overflow: 'hidden',
                            }}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                position: 'absolute',
                                fontSize: '10px',
                                left: '6px',
                            }}>
                            <StarIcon fontSize="small" sx={{ width: '14px', color: colors.yellow }} />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyItems: 'center',
                                    alignItems: 'center',
                                    marginLeft: '4px',
                                }}>
                                {rating}
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                paddingTop: '-100px',
                                margin: 'auto',
                                height: '110px',
                                width: '100%',
                                borderRadius: '15px',
                                overflow: 'hidden',
                                padding: '0',
                                backgroundImage: `url(${config.STATIC_PATH}${image})`,
                                backgroundPosition: 'center center',
                                backgroundSize: 'cover',
                            }}
                        />
                    </>
                )}
            </Box>
            <Box mb={'14px'} sx={{ textAlign: 'left', fontSize: '16px' }}>
                {isLoading ? 'Loading...' : name}
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    position: 'relative',
                    width: '100%',
                    background: colors.costBG,
                    alignItems: 'center',
                    borderRadius: '8px',
                    height: '34px',
                }}>
                <Box
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexGrow: '6',
                        fontSize: '16px',
                    }}>
                    <b>{isLoading ? <LocalLoader size={LOCAL_LOADER_SIZES.XS} /> : cost + 'c'}</b>
                </Box>
                <Box
                    onClick={
                        loggedIn ? (localInCart ? deleteFromCartCallback : addToCartCallback) : loginAlert
                    }
                    sx={{
                        flexGrow: '1',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '4px 0',
                        background: colors.iconActiveColor,
                        color: colors.primary,
                        borderRadius: '8px',
                        scale: '1.3',
                        width: '22px',
                        minWidth: '22px',
                        height: '22px',
                    }}>
                    {addingToCartIsLoading ? (
                        <CircularProgress color="inherit" size={'20px'} />
                    ) : localInCart ? (
                        <RemoveShoppingCartIcon />
                    ) : (
                        <AddShoppingCartIcon fontSize="small" />
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default CardProduct;
