import React, { useState } from 'react';
import colors from 'layout/colors';
import Box from '@mui/material/Box';
import { NotificationI } from 'api/types/notification';

interface PropI {
    data: NotificationI;
}

const NotificationItem: React.FC<PropI> = ({ data }) => {
    const [localNotView, setLocalNotView] = useState(true);
    return (
        <Box
            key={data.id}
            onClick={() => {
                setLocalNotView(false);
            }}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px',
                minHeight: '72px',
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                marginBottom: '18px',
                background: colors.cardBG,
                borderRadius: '15px',
                overflow: 'hidden',
                position: 'relative',
            }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                }}>
                <Box
                    sx={{
                        minWidth: '76px',
                        width: '76px',
                        height: '76px',
                        borderRadius: '15px',
                        overflow: 'hidden',
                        float: 'left',
                        backgroundImage: `url(${data?.img})`,
                        noRepeat: 'center top',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        marginRight: '12px',
                    }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'space-around',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        width: '100%',
                    }}>
                    <Box
                        mb="8px"
                        sx={{
                            fontSize: '14px',
                            lineHeight: '160%',
                            width: '100%',
                            textAlign: 'center',
                        }}>
                        {data?.title}
                    </Box>
                    <Box
                        mb="8px"
                        sx={{
                            fontSize: '12px',
                        }}>
                        {data?.description}
                    </Box>
                    <Box
                        sx={{
                            fontSize: '15px',
                            lineHeight: '115%',
                        }}></Box>
                    {data?.isNew && localNotView && (
                        <Box sx={{ position: 'absolute', top: 3, right: 12 }}>
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                                <circle cx="4" cy="4" r="4" fill="#C94C4C" />
                            </svg>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default NotificationItem;
