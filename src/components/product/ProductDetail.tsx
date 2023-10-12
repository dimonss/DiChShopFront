import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getProductById } from 'api/contentAPI';
import { API_RESPONSE_STATUS } from 'api/statuses';
import { ProductStateI } from 'redux/types/productTypes';
import Box from '@mui/material/Box';
import colors from 'layout/colors';
import StarIcon from '@mui/icons-material/Star';
import config from 'config';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GoBackButton from 'components/reusable/buttons/GoBackButton';
import strings from 'constants/strings';
import Swal from 'sweetalert2';
import LocalLoader, { LOCAL_LOADER_SIZES } from 'components/reusable/loaders/LocalLoader';

const ProductDetail = () => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState<ProductStateI>();
    const params = useParams();
    const addToCart = useCallback(() => {
        Swal.fire({
            position: 'top',
            icon: 'success',
            title: strings.item_successfully_added_to_cart,
            showConfirmButton: false,
            timer: 1500,
            color: colors.sideNavBarBG,
        });
    }, []);
    const changeFavoriteStatus = useCallback(() => {
        setIsFavorite((prev) => {
            Swal.fire({
                position: 'top',
                icon: 'success',
                title: isFavorite
                    ? strings.item_successfully_deleted_to_favorite
                    : strings.item_successfully_added_to_favorite,
                showConfirmButton: false,
                timer: 1500,
                color: 'white',
            });
            return !prev;
        });
    }, [isFavorite]);
    useEffect(() => {
        setIsLoading(true);
        getProductById(params?.id || '1')
            .then((res) => {
                if (res?.data?.status === API_RESPONSE_STATUS?.OK) {
                    setData(res?.data?.data);
                }
            })
            .catch(() => {
                setError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);
    return (
        <Box
            p="14px"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                color: colors.white,
                minHeight: 'calc(100vh - 28px)',
            }}>
            <GoBackButton />
            <Box>
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
                ) : (
                    <Box
                        sx={{
                            paddingTop: '-100px',
                            margin: 'auto',
                            height: '412px',
                            width: '100%',
                            borderRadius: '40px',
                            overflow: 'hidden',
                            padding: '0',
                            backgroundImage: `url(${config.STATIC_PATH}${data?.img})`,
                            backgroundPosition: 'center center',
                            backgroundSize: 'cover',
                            marginBottom: '18px',
                        }}
                    />
                )}
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'space-between',
                        marginBottom: '12px',
                    }}>
                    <Box sx={{ fontSize: 24 }}>{data?.title}</Box>

                    <Box onClick={changeFavoriteStatus}>
                        {isFavorite ? (
                            <FavoriteIcon
                                sx={{
                                    color: colors.red,
                                    width: 32,
                                    height: 32,
                                }}
                            />
                        ) : (
                            <FavoriteBorderIcon
                                sx={{
                                    width: 32,
                                    height: 32,
                                }}
                            />
                        )}
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', fontSize: '16px', marginBottom: '12px' }}>
                    <Box>{data?.subtitle}</Box>
                    <Box
                        sx={{
                            display: 'flex',
                            fontSize: '10px',
                            marginLeft: '16px',
                        }}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyItems: 'center',
                                alignItems: 'center',
                            }}>
                            <StarIcon fontSize="small" sx={{ width: '14px', color: colors.yellow }} />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyItems: 'center',
                                alignItems: 'center',
                                marginLeft: '4px',
                            }}>
                            {4.5}
                            {/*//todo get Rating*/}
                        </Box>
                    </Box>
                </Box>
                <Box>{data?.description}</Box>
            </Box>

            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                <Box>
                    <Box>{strings.price}</Box>
                    <Box sx={{ fontSize: '24px', position: 'relative' }}>
                        {isLoading ? (
                            <Box sx={{ position: 'absolute', top: '-24px', left: '-6px' }}>
                                <LocalLoader size={LOCAL_LOADER_SIZES.XS} />
                            </Box>
                        ) : (
                            <b>{data?.sellingPrice + 'c'}</b>
                        )}
                    </Box>
                </Box>
                <Box
                    onClick={addToCart}
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
                        <b>{strings.add_to_cart}</b>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default ProductDetail;
