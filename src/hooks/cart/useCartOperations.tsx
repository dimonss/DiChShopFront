import React, { useCallback, useEffect, useState } from 'react';
import { addToCart, deleteFromCart } from 'api/privateAPI';
import { API_RESPONSE_STATUS } from 'api/statuses';
import Swal from 'sweetalert2';
import colors from 'layout/colors';
import strings from 'constants/strings';

interface TypeI {
    id: number;
    inCart?: boolean;
}

const useCartOperations = ({ id = -1, inCart = false }: TypeI) => {
    const [cartOperationsIsLoading, setCartOperationsIsLoading] = useState<boolean>(false);
    const [localInCart, setLocalInCart] = useState<boolean>(inCart || false);
    useEffect(() => {
        setLocalInCart(inCart);
    }, [inCart]); //TODO cruth for update status inCart

    const addProductToCart = useCallback(async () => {
        setCartOperationsIsLoading(true);
        await addToCart(id)
            .then((res) => {
                if (res?.data?.status === API_RESPONSE_STATUS.OK) {
                    setLocalInCart(true);
                    // Swal.fire({
                    //     position: 'top',
                    //     icon: 'success',
                    //     title: res?.data?.message,
                    //     showConfirmButton: false,
                    //     timer: 1500,
                    //     color: colors.sideNavBarBG,
                    // });
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
                setCartOperationsIsLoading(false);
            });
    }, [id]);

    const deleteProductFromCart = useCallback(async () => {
        setCartOperationsIsLoading(true);
        await deleteFromCart(id)
            .then((res) => {
                if (res?.data?.status === API_RESPONSE_STATUS.OK) {
                    setLocalInCart(false);
                    // Swal.fire({
                    //     position: 'top',
                    //     icon: 'success',
                    //     title: res?.data?.message,
                    //     showConfirmButton: false,
                    //     timer: 1500,
                    //     color: colors.sideNavBarBG,
                    // });
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
                setCartOperationsIsLoading(false);
            });
    }, [id]);

    return { addProductToCart, deleteProductFromCart, cartOperationsIsLoading, localInCart };
};
export default useCartOperations;
