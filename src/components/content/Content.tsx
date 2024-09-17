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
import { AmplitudeEvents, logEvent, setUserId } from 'utils/logger';
import useDebounce from 'hooks/useDebounce';

const Content = () => {
    const dispatch = useAppDispatch();
    const product = useAppSelector((store) => store?.content?.product);
    const isLoading = useAppSelector((store) => store?.loading?.product);
    const loggedIn = useAppSelector((store) => store?.user?.loggedIn);
    const [params] = useSearchParams();
    const userId = useAppSelector((store) => store?.user?.id);
    useEffect(() => {
        setUserId(String(userId));
        logEvent(AmplitudeEvents.MAIN_PAGE);
    }, []);

    useEffect(
        useDebounce(() => {
            dispatch(
                fetchProduct({
                    search: params.get('search'),
                    categoryId: params.get('category'),
                    loggedIn,
                }),
            );
        }, 500),
        [params, loggedIn],
    );

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
                {product.length
                    ? product.map((item) => (
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
                    : !isLoading && (
                          <Box sx={{ color: colors.iconActiveColor }}>{strings.nothing_found}</Box>
                      )}
            </Grid>
            <SideNavBar />
        </>
    );
};

export default Content;
