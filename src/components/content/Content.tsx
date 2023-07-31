import React from 'react';
import {Container, Grid} from "@mui/material";
import AboutUser from "components/aboutUser/AboutUser";
import SearchIcon from '@mui/icons-material/Search';
import {alpha, styled} from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import CardProduct from "components/cardProduct/CardProduct";


const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: "8px",
    backgroundColor: '#171017',
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: '#B9AE9B',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const Content = () => {


    return (
        <Container>
            <AboutUser/>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon sx={{color: '#B9AE9B'}}/>
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Browse your favourite coffee…"
                    inputProps={{'aria-label': 'search'}}
                />
            </Search>
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