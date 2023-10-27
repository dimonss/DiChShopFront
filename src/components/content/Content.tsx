import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import CardProduct from 'components/product/CardProduct';
import SearchInput from 'components/reusable/searchInput/SearchInput';
import SideNavBar from 'components/sideNavBar/SideNavBar';
import { useAppDispatch, useAppSelector } from 'types/globalTypes';
import { fetchProduct } from 'redux/slices/contentSlice';
import { useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import colors from 'layout/colors';
import strings from 'constants/strings';

const Content = () => {
    const dispatch = useAppDispatch();
    const [product, isLoading, loggedIn] = useAppSelector((store) => [
        store?.content?.product,
        store?.loading?.product,
        store?.user?.loggedIn,
    ]);
    const [params] = useSearchParams();

    useEffect(() => {
        dispatch(fetchProduct({ searchText: params.get('search'), loggedIn }));
    }, [params.get('search'), loggedIn]);

    return (
        <>
            <SearchInput />
            <Grid sx={{ display: 'grid', gridTemplateColumns: '50% 50%', margin: '20px 0 90px 46px' }}>
                {isLoading && (
                    <CardProduct
                        key={-1}
                        id={-1}
                        rating={4.9}
                        image={''}
                        name={''}
                        cost={-1}
                        isLoading={true}
                    />
                )}
                {product.length ? (
                    product.map((item) => (
                        <CardProduct
                            key={item.id}
                            id={item.id}
                            rating={item.rating}
                            image={item.img}
                            name={item.title}
                            cost={item.sellingPrice}
                            isLoading={isLoading}
                            loggedIn={loggedIn}
                            inCart={item?.inCart}
                        />
                    ))
                ) : (
                    <Box sx={{ color: colors.iconActiveColor }}>{strings.nothing_found}</Box>
                )}
            </Grid>
            <SideNavBar />
        </>
    );
};

export default Content;
