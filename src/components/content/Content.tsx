import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import AboutUser from 'components/aboutUser/AboutUser';
import CardProduct from 'components/cardProduct/CardProduct';
import SearchInput from 'components/reusable/searchInput/SearchInput';
import SideNavBar from 'components/sideNavBar/SideNavBar';
import { ContentI } from 'mockData/Content';
import { useAppDispatch, useAppSelector } from 'types/globalTypes';
import { fetchProduct } from 'redux/slices/contentSlice';

const Content = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<ContentI[]>([]);
    const dispatch = useAppDispatch();
    const product = useAppSelector((store) => store.content.product);

    useEffect(() => {
        dispatch(fetchProduct());
    }, []);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, [data]);

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
            <SideNavBar setContent={setData} />
        </Container>
    );
};

export default Content;
