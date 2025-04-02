import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotificationsIcon from '@mui/icons-material/Notifications';
import colors from 'layout/colors';
import transitions from 'layout/transitions';
import URLS from 'constants/urls';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import { getStatusOfNewNotifications } from 'api/privateAPI';
import { API_RESPONSE_STATUS } from 'api/statuses';

const links = [
    { component: HomeIcon, link: URLS.HOME },
    { component: ShoppingCartIcon, link: URLS.CART },
    { component: FavoriteIcon, link: URLS.FAVORITE },
    { component: NotificationsIcon, link: URLS.NOTIFICATIONS, isNotification: true },
];

const BottomNavBar = () => {
    const pathname = window.location?.pathname;
    const [isNewNotifications, setIsNewNotifications] = useState(false);
    useEffect(() => {
        getStatusOfNewNotifications().then((res) => {
            if (res?.data?.status === API_RESPONSE_STATUS.OK) {
                setIsNewNotifications(res?.data?.data);
            }
        });
    }, []);
    useEffect(() => {
        if (pathname === URLS.NOTIFICATIONS) {
            setTimeout(() => {
                getStatusOfNewNotifications().then((res) => {
                    if (res?.data?.status === API_RESPONSE_STATUS.OK) {
                        setIsNewNotifications(res?.data?.data);
                    }
                });
            }, 200);
        }
    }, [pathname]);

    return (
        <Container
            sx={{
                position: 'fixed',
                bottom: '0px',
                background: colors.primary,
                boxShadow: `0px 0px 20px ${colors.iconActiveColor}`,
                zIndex: 1,
                maxWidth: '100%',
                width: '430px',
                borderRadius: '40px 40px 0 0',
            }}>
            <Grid
                container
                width="100%"
                justifyContent="space-around"
                sx={{ height: '78px', alignItems: 'center' }}>
                {links.map((item, index) => (
                    <Link key={index} to={item.link} style={{ position: 'relative' }}>
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
                                position: 'relative',
                            }}
                        />
                        {item?.isNotification && isNewNotifications && (
                            <Box sx={{ position: 'absolute', top: 5, right: 12 }}>
                                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                                    <circle cx="4" cy="4" r="4" fill="#C94C4C" />
                                </svg>
                            </Box>
                        )}
                    </Link>
                ))}
            </Grid>
        </Container>
    );
};

export default BottomNavBar;
