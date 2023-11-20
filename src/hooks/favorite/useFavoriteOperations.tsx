import React, { useCallback, useEffect, useState } from 'react';
import { addToFavorite, deleteFromFavorite } from 'api/privateAPI';
import { API_RESPONSE_STATUS } from 'api/statuses';
import Swal from 'sweetalert2';
import colors from 'layout/colors';
import strings from 'constants/strings';
import { AmplitudeEvents, logEvent } from 'utils/logger';

interface TypeI {
    id: number;
    favorite?: boolean;
    deletedItemCallback?: (id: number) => void;
}

const useFavoriteOperations = ({ id, favorite = false, deletedItemCallback = () => {} }: TypeI) => {
    const [favoritesOperationsIsLoading, setFavoritesOperationsIsLoading] = useState<boolean>(false);
    const [localInFavorites, setLocalInFavorites] = useState<boolean>(favorite || false);
    useEffect(() => {
        setLocalInFavorites(favorite);
    }, [favorite]); //TODO cruth for update status inFavorite

    const addProductToFavorites = useCallback(async () => {
        setFavoritesOperationsIsLoading(true);
        await addToFavorite(id)
            .then((res) => {
                if (res?.data?.status === API_RESPONSE_STATUS.OK) {
                    setLocalInFavorites(true);
                    logEvent(AmplitudeEvents.ADD_TO_FAVORITE, { id });
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
                setFavoritesOperationsIsLoading(false);
            });
    }, [id]);

    const deleteProductFromFavorites = useCallback(async () => {
        setFavoritesOperationsIsLoading(true);
        await deleteFromFavorite(id)
            .then((res) => {
                if (res?.data?.status === API_RESPONSE_STATUS.OK) {
                    setLocalInFavorites(false);
                    deletedItemCallback(id);
                    logEvent(AmplitudeEvents.DELETE_FROM_FAVORITE, { id });
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
                setFavoritesOperationsIsLoading(false);
            });
    }, [id]);

    return {
        addProductToFavorites,
        deleteProductFromFavorites,
        favoritesOperationsIsLoading,
        localInFavorites,
    };
};
export default useFavoriteOperations;
