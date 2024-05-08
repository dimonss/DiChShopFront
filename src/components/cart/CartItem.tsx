import React, { useCallback, useState } from 'react';
import colors from 'layout/colors';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import { ReactComponent as DecrementIcon } from 'images/decrement.svg';
import { ReactComponent as IncrementIcon } from 'images/increment.svg';
import { decrementProductInCart, deleteFromCart, incrementProductInCart } from 'api/privateAPI';
import { API_RESPONSE_STATUS } from 'api/statuses';
import { ProductStateI } from 'redux/types/productTypes';
import LocalLoader, { LOCAL_LOADER_SIZES } from 'components/reusable/loaders/LocalLoader';
import { getApiErrorMessage, getResponseErrorMessage } from 'api/utils';
import useAlert from 'hooks/useAlert';
import URLS from 'constants/urls';
import { Link } from 'react-router-dom';
import { AmplitudeEvents, logEvent } from 'utils/logger';
import { getFullPathToImg } from 'utils/mainUtils';

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
    changeAmountCallback: (id: number, counter: number) => void;
}

const CartItem: React.FC<PropI> = ({ data, deleteItemCallback, changeAmountCallback }) => {
    const [counter, setCounter] = useState<number>(data.counter || 1);
    const [isLoading, setIsLoading] = useState(false);
    const { showErrorAlert } = useAlert();

    const deleteProductFromCart = useCallback(async (id: number) => {
        setIsLoading(true);
        await deleteFromCart(id)
            .then((res) => {
                if (res?.data?.status === API_RESPONSE_STATUS.OK) {
                    deleteItemCallback(id);
                    logEvent(AmplitudeEvents.DELETE_FROM_CART, { id });
                } else {
                    showErrorAlert(getResponseErrorMessage(res));
                }
            })
            .catch((e) => {
                alert(getApiErrorMessage(e));
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const increment = useCallback(async () => {
        setIsLoading(true);
        await incrementProductInCart(data?.id)
            .then((res) => {
                if (res?.data?.status === API_RESPONSE_STATUS.OK) {
                    setCounter(res?.data?.data);
                    changeAmountCallback(data?.id, res?.data?.data);
                } else {
                    showErrorAlert(getResponseErrorMessage(res));
                }
            })
            .catch((e) => {
                alert(getApiErrorMessage(e));
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [counter, data.id]);

    const decrement = useCallback(async () => {
        setIsLoading(true);
        await decrementProductInCart(data?.id)
            .then((res) => {
                if (res?.data?.status === API_RESPONSE_STATUS.OK) {
                    setCounter(res?.data?.data);
                    changeAmountCallback(data?.id, res?.data?.data);
                } else {
                    showErrorAlert(getResponseErrorMessage(res));
                }
            })
            .catch((e) => {
                showErrorAlert(getApiErrorMessage(e));
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
            <Link to={URLS.PRODUCT_RAW + data?.id} style={{ maxWidth: '70%' }}>
                <Box>
                    <Box
                        sx={{
                            width: '76px',
                            height: '76px',
                            borderRadius: '15px',
                            overflow: 'hidden',
                            float: 'left',
                            backgroundImage: `url(${getFullPathToImg(data?.img)})`,
                            noRepeat: 'center top',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            marginRight: '12px',
                        }}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'space-around',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                        }}>
                        <Box
                            mb="8px"
                            sx={{
                                fontSize: '14px',
                                lineHeight: '160%',
                            }}>
                            {data?.title?.slice(0, 35)}
                        </Box>
                        <Box
                            mb="8px"
                            sx={{
                                fontSize: '12px',
                                lineHeight: '145%',
                            }}>
                            {data?.description?.slice(0, 35)}
                        </Box>
                        <Box
                            sx={{
                                fontSize: '15px',
                                lineHeight: '115%',
                            }}>
                            <b>{data?.sellingPrice + 'c'}</b>
                        </Box>
                    </Box>
                </Box>
            </Link>
            <Box
                sx={{
                    position: 'relative',
                    background: colors.costBG,
                    display: 'flex',
                    minWidth: '90px',
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
