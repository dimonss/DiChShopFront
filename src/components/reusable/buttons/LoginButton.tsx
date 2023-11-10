import React from 'react';
import Box from '@mui/material/Box';
import useAuthAlert from 'hooks/useLoginAlert';
import colors from 'layout/colors';
import LoginIcon from '@mui/icons-material/Login';
import strings from 'constants/strings';

const GoBackButton = () => {
    const { loginAlert } = useAuthAlert('=)');
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '10px',
                textTransform: 'uppercase',
                background: colors.iconActiveColor,
                color: colors.text,
                minWidth: '72%',
                fontSize: '16px',
                height: '45px',
            }}
            onClick={loginAlert}>
            {strings.login}
            <LoginIcon />
        </Box>
    );
};

export default GoBackButton;
