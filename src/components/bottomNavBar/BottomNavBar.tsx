import React, {useState} from 'react';
import {Container, Grid} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotificationsIcon from '@mui/icons-material/Notifications';
import color from 'layout/colors';
import transitions from "layout/transitions";

const BottomNavBar = () => {
    const [activePage, setActivePage] = useState(0);
    return (
        <Container fixed sx={{
            position: 'fixed',
            bottom: '0px',
            background: color.primary,
            boxShadow: `0px 0px 20px ${color.iconActiveColor}`,
            zIndex:1,
        }}>
            <Grid container width='100%' justifyContent='space-around' sx={{height: '78px', alignItems: 'center'}}>
                <HomeIcon fontSize='large'
                          sx={{
                              color: activePage === 0 ? color.iconActiveColor : color.iconDefaultColor,
                              padding: '8px', ...transitions.color
                          }}
                          onClick={() => {
                              setActivePage(0)
                          }}/>

                <ShoppingCartIcon
                    fontSize='large'
                    sx={{
                        color: activePage === 1 ? color.iconActiveColor : color.iconDefaultColor,
                        padding: '8px', ...transitions.color
                    }}
                    onClick={() => {
                        setActivePage(1)
                    }}/>

                <FavoriteIcon
                    fontSize='large'
                    sx={{
                        color: activePage === 2 ? color.iconActiveColor : color.iconDefaultColor,
                        padding: '8px', ...transitions.color
                    }}
                    onClick={() => {
                        setActivePage(2)
                    }}/>

                <NotificationsIcon
                    fontSize='large'
                    sx={{
                        color: activePage === 3 ? color.iconActiveColor : color.iconDefaultColor,
                        padding: '8px', ...transitions.color
                    }}
                    onClick={() => {
                        setActivePage(3)
                    }}/>

            </Grid>
        </Container>
    );
};

export default BottomNavBar;