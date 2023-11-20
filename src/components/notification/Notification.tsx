import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import colors from 'layout/colors';
import LocalLoader, { LOCAL_LOADER_SIZES } from 'components/reusable/loaders/LocalLoader';
import { TransitionGroup } from 'react-transition-group';
import Collapse from '@mui/material/Collapse';
import NotificationItem from 'components/notification/NotificationItem';
import strings from 'constants/strings';
import { fetchNotification } from 'redux/slices/contentSlice';
import { useAppDispatch, useAppSelector } from 'types/globalTypes';
import { AmplitudeEvents, logEvent } from 'utils/logger';

const Notification = () => {
    const isLoading = useAppSelector((state) => state?.loading?.notification);
    const notificationList = useAppSelector((state) => state?.content?.notification);
    const dispatch = useAppDispatch();

    useEffect(() => {
        logEvent(AmplitudeEvents.NOTIFICATION_PAGE);
        dispatch(fetchNotification());
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                color: colors.white,
                width: '100%',
                marginBottom: '70px',
            }}>
            <Box p={'16px'}>
                <h3 style={{ fontWeight: 400, margin: '14px 0' }}>{strings.notifications}</h3>
                {isLoading ? (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <LocalLoader size={LOCAL_LOADER_SIZES.L} />
                    </Box>
                ) : notificationList?.length ? (
                    <TransitionGroup>
                        {notificationList?.map((item) => (
                            <Collapse key={item.id} sx={{ borderRadius: '16px' }}>
                                <NotificationItem data={item} />
                            </Collapse>
                        ))}
                    </TransitionGroup>
                ) : (
                    <h3>{strings.notifications_is_empty}</h3>
                )}
            </Box>
        </Box>
    );
};

export default Notification;
