import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotificationsIcon from '@mui/icons-material/Notifications';
import colors from 'layout/colors';
import transitions from 'layout/transitions';
import URLS from 'constants/urls';
import strings from 'constants/strings';
import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import { getStatusOfNewNotifications } from 'api/privateAPI';
import { API_RESPONSE_STATUS } from 'api/statuses';

const links = [
    { component: HomeIcon, link: URLS.HOME, label: strings.nav_home },
    { component: ShoppingCartIcon, link: URLS.CART, label: strings.nav_cart },
    { component: FavoriteIcon, link: URLS.FAVORITE, label: strings.nav_favorite },
    { component: NotificationsIcon, link: URLS.NOTIFICATIONS, label: strings.nav_notifications, isNotification: true },
];

const BottomNavBar = () => {
    const location = useLocation();
    const pathname = location.pathname;
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
                zIndex: 1,
                background: colors.primary,

                // Mobile: bottom bar
                bottom: { xs: '0px', lg: 'auto' },
                top: { xs: 'auto', lg: 0 },
                left: { xs: 'auto', lg: 0 },
                right: { xs: 'auto', lg: 'auto' },
                width: { xs: '100%', lg: '200px' },
                maxWidth: { xs: '100%', lg: '200px' },
                height: { xs: 'auto', lg: '100vh' },
                transform: { xs: 'none', lg: 'none' },
                borderRadius: { xs: '40px 40px 0 0', lg: '0 0 40px 0' },
                boxShadow: {
                    xs: `0px 0px 20px ${colors.iconActiveColor}`,
                    lg: `4px 0px 20px rgba(0,0,0,0.4)`,
                },
                padding: { xs: '0 16px', lg: '24px 0' },
                display: 'flex',
                flexDirection: { xs: 'row', lg: 'column' },
                alignItems: { xs: 'center', lg: 'stretch' },
                justifyContent: { xs: 'space-around', lg: 'flex-start' },
            }}>
            <Grid
                container
                sx={{
                    height: { xs: '78px', lg: 'auto' },
                    alignItems: 'center',
                    justifyContent: { xs: 'space-around', lg: 'flex-start' },
                    flexDirection: { xs: 'row', lg: 'column' },
                    gap: { xs: 0, lg: '8px' },
                    mt: { xs: 0, lg: '16px' },
                }}
                width="100%">
                {links.map((item, index) => {
                    const isActive = item?.link === pathname;
                    return (
                        <Link
                            key={index}
                            to={item.link}
                            style={{
                                position: 'relative',
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: { xs: '8px', lg: '12px 24px' },
                                    borderRadius: '12px',
                                    width: { xs: 'auto', lg: '100%' },
                                    backgroundColor: isActive
                                        ? { xs: 'transparent', lg: 'rgba(239, 227, 200, 0.08)' }
                                        : 'transparent',
                                    ...transitions.color,
                                    transition: 'background-color 0.3s, color 1s',
                                    '&:hover': {
                                        backgroundColor: { xs: 'transparent', lg: 'rgba(239, 227, 200, 0.05)' },
                                    },
                                }}>
                                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                    <item.component
                                        fontSize="large"
                                        sx={{
                                            color: isActive
                                                ? colors.iconActiveColor
                                                : colors.iconDefaultColor,
                                            ...transitions.color,
                                        }}
                                    />
                                    {item?.isNotification && isNewNotifications && (
                                        <Box sx={{ position: 'absolute', top: -2, right: -2 }}>
                                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                                                <circle cx="4" cy="4" r="4" fill="#C94C4C" />
                                            </svg>
                                        </Box>
                                    )}
                                </Box>
                                <Typography
                                    sx={{
                                        display: { xs: 'none', lg: 'block' },
                                        color: isActive
                                            ? colors.iconActiveColor
                                            : colors.iconDefaultColor,
                                        fontSize: '14px',
                                        fontWeight: isActive ? 600 : 400,
                                        whiteSpace: 'nowrap',
                                        ...transitions.color,
                                    }}>
                                    {item.label}
                                </Typography>
                            </Box>
                        </Link>
                    );
                })}
            </Grid>
        </Container>
    );
};

export default BottomNavBar;
