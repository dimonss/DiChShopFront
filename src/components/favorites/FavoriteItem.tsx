import React from 'react';
import colors from 'layout/colors';
import Box from '@mui/material/Box';
import config from 'config';
import DeleteIcon from '@mui/icons-material/Delete';
import { ProductStateI } from 'redux/types/productTypes';
import URLS from 'constants/urls';
import { Link } from 'react-router-dom';
import useFavoriteOperations from 'hooks/favorite/useFavoriteOperations';
import LocalLoader, { LOCAL_LOADER_SIZES } from 'components/reusable/loaders/LocalLoader';

interface PropI {
    data: ProductStateI;
    deletedItemCallback: (id: number) => void;
}

const FavoriteItem: React.FC<PropI> = ({ data, deletedItemCallback }) => {
    const { deleteProductFromFavorites, favoritesOperationsIsLoading } = useFavoriteOperations({
        ...data,
        deletedItemCallback,
    });

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
            <Link to={URLS.PRODUCT_RAW + data?.id}>
                <Box>
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
                            {data?.title?.slice(0, 40)}
                        </Box>
                        <Box
                            mb="8px"
                            sx={{
                                fontSize: '12px',
                                lineHeight: '145%',
                            }}>
                            {data?.description?.slice(0, 46)}
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
                onClick={deleteProductFromFavorites}
                sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                {favoritesOperationsIsLoading ? (
                    <Box sx={{ position: 'relative', width: '25px', height: '25px' }}>
                        <Box
                            sx={{
                                position: 'absolute',
                                width: '25px',
                                height: '25px',
                                display: 'flex',
                                alignItems: 'center',
                                right: '5px',
                            }}>
                            <LocalLoader size={LOCAL_LOADER_SIZES.XS} />
                        </Box>
                    </Box>
                ) : (
                    <DeleteIcon
                        sx={{
                            color: colors.iconActiveColor,
                            width: 25,
                            height: 25,
                        }}
                    />
                )}
            </Box>
        </Box>
    );
};

export default FavoriteItem;
