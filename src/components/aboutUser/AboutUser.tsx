import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import brewImage from 'images/DiChShop.png';
import { useAppSelector } from 'types/globalTypes';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import useAuthAlert from 'hooks/useLoginAlert';
import useLogoutAlert from 'hooks/useLogoutAlert';
import defaultUserPhoto from 'images/default_user_photo.png';
import { getFullPathToImg } from 'utils/mainUtils';

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
                        }}>
                        <img
                            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = defaultUserPhoto;
                            }}
                            src={loggedIn ? getFullPathToImg(photo) : defaultUserPhoto}
                            style={{
                                height: '50px',
                                width: '50px',
                            }}
                            alt={'user avatar'}
                        />
                    </Avatar>
                </Box>
            </Box>
        </Box>
    );
};

export default AboutUser;
