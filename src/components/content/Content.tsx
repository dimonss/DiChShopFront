import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import AboutUser from 'components/aboutUser/AboutUser';
import CardProduct from 'components/cardProduct/CardProduct';
import SearchInput from 'components/reusable/searchInput/SearchInput';
import SideNavBar from 'components/sideNavBar/SideNavBar';
import { ContentI } from 'mockData/Content';

const Content = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<ContentI[]>([]);

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
                {data.map((item) => (
                    <CardProduct
                        key={item.id}
                        rating={item.rating}
                        image={item.image}
                        name={item.name}
                        cost={item.cost}
                        isLoading={isLoading}
                    />
                ))}
            </Grid>
            <SideNavBar setContent={setData} />
        </Container>
    );
};

export default Content;
