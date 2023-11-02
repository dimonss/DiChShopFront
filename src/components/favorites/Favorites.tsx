import React, { useCallback, useEffect, useState } from 'react';
import { API_RESPONSE_STATUS } from 'api/statuses';
import { getApiErrorMessage, getResponseErrorMessage } from 'api/utils';
import { getFavorite } from 'api/privateAPI';
import { ProductStateI } from 'redux/types/productTypes';
import { useAppSelector } from 'types/globalTypes';
import Box from '@mui/material/Box';
import colors from 'layout/colors';
import LocalLoader, { LOCAL_LOADER_SIZES } from 'components/reusable/loaders/LocalLoader';
import { TransitionGroup } from 'react-transition-group';
import Collapse from '@mui/material/Collapse';
import FavoriteItem from 'components/favorites/FavoriteItem';
import useAlert from 'hooks/useAlert';

const Favorite = () => {
    const { loggedIn } = useAppSelector((state) => state.user);
    const [favoritesList, setFavoritesList] = useState<ProductStateI[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { showErrorAlert } = useAlert();

    useEffect(() => {
        if (error) {
            showErrorAlert(error);
            setError('');
        }
    }, [error]);

    useEffect(() => {
        if (loggedIn) {
            setIsLoading(true);
            getFavorite()
                .then((res) => {
                    if (res.data.status === API_RESPONSE_STATUS.OK) {
                        setFavoritesList(res.data.data);
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
    const deletedItemCallback = useCallback((id: number) => {
        setFavoritesList((prev) => prev.filter((item) => item?.id !== id));
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                color: colors.white,
                width: '100%',
                marginBottom: '70px',
            }}>
            <Box p={'16px'}>
                <h3 style={{ fontWeight: 400, margin: '14px 0' }}>Избранные</h3>
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
                ) : favoritesList?.length ? (
                    <TransitionGroup>
                        {favoritesList?.map((item) => (
                            <Collapse key={item.id} sx={{ borderRadius: '16px' }}>
                                <FavoriteItem data={item} deletedItemCallback={deletedItemCallback} />
                            </Collapse>
                        ))}
                    </TransitionGroup>
                ) : (
                    <h3>У вас еще нет товаров в избранном</h3>
                )}
            </Box>
        </Box>
    );
};

export default Favorite;
