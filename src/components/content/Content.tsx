import React from 'react';
import {Container, Grid} from "@mui/material";
import AboutUser from "components/aboutUser/AboutUser";
import CardProduct from "components/cardProduct/CardProduct";
import SearchInput from "components/reusable/searchInput/SearchInput";

const Content = () => {
    return (
        <Container>
            <AboutUser/>
            <SearchInput/>
            <Grid sx={{display: 'grid', gridTemplateColumns: '50% 50%', margin: '20px 0 90px 46px'}}>
                <CardProduct/>
                <CardProduct/>
                <CardProduct/>
                <CardProduct/>
                <CardProduct/>
                <CardProduct/>
                <CardProduct/>
                <CardProduct/>
                <CardProduct/>
                <CardProduct/>
            </Grid>
        </Container>
    );
};

export default Content;