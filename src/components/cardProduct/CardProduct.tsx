import React from 'react';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import coffeeImage from 'images/content/coffee.png';
import colors from 'layout/colors';
import color from 'layout/colors';
import AddIcon from '@mui/icons-material/Add';
import LocalLoader, { LOCAL_LOADER_SIZES } from 'components/reusable/loaders/LocalLoader';

interface PropI {
    image: string;
    name: string;
    cost: number;
    rating: number;
    isLoading?: boolean;
}

const CardProduct: React.FC<PropI> = ({
    image = coffeeImage,
    name = 'Отсутствует',
    cost = 0,
    rating = 0,
    isLoading = true,
}) => {
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
            }}>
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
                            sx={{ display: 'flex', position: 'absolute', fontSize: '10px', left: '6px' }}>
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
                                backgroundImage: `url(http://127.0.0.1/static/${image})`,
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
                    background: color.costBG,
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
                    <AddIcon fontSize="small" />
                </Box>
            </Box>
        </Box>
    );
};

export default CardProduct;
