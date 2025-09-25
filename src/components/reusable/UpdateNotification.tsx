import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Refresh, Close } from '@mui/icons-material';
import colors from 'layout/colors';

interface UpdateNotificationProps {
    isVisible: boolean;
    onUpdate: () => void;
    onDismiss: () => void;
    isUpdating: boolean;
}

const UpdateNotification: React.FC<UpdateNotificationProps> = ({
    isVisible,
    onUpdate,
    onDismiss,
    isUpdating
}) => {
    if (!isVisible) return null;

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 9999,
                background: colors.iconActiveColor,
                color: colors.text,
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <Refresh sx={{ marginRight: '8px' }} />
                <Typography variant="body2">
                    Доступно обновление приложения
                </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: '8px' }}>
                <Button
                    variant="contained"
                    size="small"
                    onClick={onUpdate}
                    disabled={isUpdating}
                    sx={{
                        backgroundColor: colors.text,
                        color: colors.iconActiveColor,
                        '&:hover': {
                            backgroundColor: colors.text,
                            opacity: 0.9,
                        },
                        '&:disabled': {
                            backgroundColor: colors.text,
                            opacity: 0.6,
                        },
                    }}
                >
                    {isUpdating ? 'Обновление...' : 'Обновить'}
                </Button>
                
                <Button
                    variant="outlined"
                    size="small"
                    onClick={onDismiss}
                    disabled={isUpdating}
                    sx={{
                        borderColor: colors.text,
                        color: colors.text,
                        minWidth: 'auto',
                        padding: '4px 8px',
                    }}
                >
                    <Close />
                </Button>
            </Box>
        </Box>
    );
};

export default UpdateNotification;
