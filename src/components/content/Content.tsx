import React, { useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import AboutUser from 'components/aboutUser/AboutUser';
import CardProduct from 'components/cardProduct/CardProduct';
import SearchInput from 'components/reusable/searchInput/SearchInput';
import SideNavBar from 'components/sideNavBar/SideNavBar';
import { useAppDispatch, useAppSelector } from 'types/globalTypes';
import { fetchProduct } from 'redux/slices/contentSlice';
import {useSearchParams} from "react-router-dom";

const Content = () => {
    const dispatch = useAppDispatch();
    const [product, isLoading] = useAppSelector((store) => [
        store?.content?.product,
        store?.loading?.product,
    ]);
    const [params] = useSearchParams();

    useEffect(() => {
        dispatch(fetchProduct(params.get('search')));
    }, [params.get('search')]);

    return (
        <Container>
            <AboutUser />
            <SearchInput />
            <Grid sx={{ display: 'grid', gridTemplateColumns: '50% 50%', margin: '20px 0 90px 46px' }}>
                {product.map((item) => (
                    <CardProduct
                        key={item.id}
                        rating={4.9}
                        image={item.img}
                        name={item.title}
                        cost={item.sellingPrice}
                        isLoading={isLoading}
                    />
                ))}
            </Grid>
            <SideNavBar />
        </Container>
    );
};

export default Content;
