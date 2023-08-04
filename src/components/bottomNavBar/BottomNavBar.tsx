import React, { useState } from 'react';
import { Container, Grid } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotificationsIcon from '@mui/icons-material/Notifications';
import color from 'layout/colors';
import transitions from 'layout/transitions';
import URLS from 'constants/urls';
import { Link } from 'react-router-dom';

const links = [
    { component: HomeIcon, link: URLS.HOME },
    { component: ShoppingCartIcon, link: URLS.CART },
    { component: FavoriteIcon, link: URLS.FAVORITE },
    { component: NotificationsIcon, link: URLS.NOTIFICATIONS },
];

const BottomNavBar = () => {
    const [activePage, setActivePage] = useState(0);
    return (
        <Container
            fixed
            sx={{
                position: 'fixed',
                bottom: '0px',
                background: color.primary,
                boxShadow: `0px 0px 20px ${color.iconActiveColor}`,
                zIndex: 1,
                maxWidth: '100%',
                width: '425px',
            }}>
            <Grid
                container
                width="100%"
                justifyContent="space-around"
                sx={{ height: '78px', alignItems: 'center' }}>
                {links.map((item, index) => (
                    <Link key={index} to={item.link}>
                        <item.component
                            key={index}
                            fontSize="large"
                            sx={{
                                color: activePage === 0 ? color.iconActiveColor : color.iconDefaultColor,
                                padding: '8px',
                                ...transitions.color,
                            }}
                            onClick={() => {
                                setActivePage(index);
                            }}
                        />
                    </Link>
                ))}
            </Grid>
        </Container>
    );
};

export default BottomNavBar;
