import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { ReactComponent as ArrowImg } from 'images/arrow.svg';

const GoBackButton = () => {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'fixed',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                height: 40,
                width: 40,
                left: 24,
                top: 36,
                zIndex: 2,
                borderRadius: '50%',
                backdropFilter: 'blur(10px)',
            }}
            onClick={() => {
                navigate(-1);
            }}>
            <ArrowImg />
        </Box>
    );
};

export default GoBackButton;
