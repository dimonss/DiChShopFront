import React  from 'react';
import { Container, Grid } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotificationsIcon from '@mui/icons-material/Notifications';
import colors from 'layout/colors';
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
    const pathname = window.location?.pathname;
    return (
        <Container
            fixed
            sx={{
                position: 'fixed',
                bottom: '0px',
                background: colors.primary,
                boxShadow: `0px 0px 20px ${colors.iconActiveColor}`,
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
                                color:
                                    item?.link === pathname
                                        ? colors.iconActiveColor
                                        : colors.iconDefaultColor,
                                padding: '8px',
                                ...transitions.color,
                            }}
                        />
                    </Link>
                ))}
            </Grid>
        </Container>
    );
};

export default BottomNavBar;
