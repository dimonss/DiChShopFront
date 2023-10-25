import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import brewImage from 'images/Brew.png';
import { useAppSelector } from 'types/globalTypes';
import config from 'config';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import useAuthAlert from 'hooks/useLoginAlert';
import useLogoutAlert from 'hooks/useLogoutAlert';
import defaultUserPhoto from 'images/default_user_photo.png';

const AboutUser = () => {
    const { photo, loggedIn } = useAppSelector((state) => state?.user);
    const { loginAlert } = useAuthAlert('=)');
    const { logoutAlert } = useLogoutAlert();
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '-16px' }}>
            <Box sx={{ justifyContent: 'flex-start', alignItems: 'flex-start', width: '123px' }}>
                <img src={brewImage} alt={'brewImage'} width={'124px'} />
            </Box>
            <Box mt={'25px'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box
                    onClick={loggedIn ? logoutAlert : loginAlert}
                    mr={'20px'}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        padding: '2px',
                        height: '50px',
                        width: '50px',
                    }}>
                    {loggedIn ? <LogoutIcon /> : <LoginIcon />}
                </Box>
                <Box
                    sx={{
                        border: '1px #DCAA70 solid',
                        borderRadius: '50%',
                        padding: '2px',
                        height: '50px',
                        width: '50px',
                    }}>
                    <Avatar
                        alt="Remy Sharp"
                        sx={{
                            height: '50px',
                            width: '50px',
                        }}
                        src={loggedIn ? config.STATIC_PATH + photo : defaultUserPhoto}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default AboutUser;
