import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import brewImage from 'images/Brew.png';
import { useAppDispatch, useAppSelector } from 'types/globalTypes';
import { loginUser } from 'redux/slices/userSlice';
import config from 'config';

const AboutUser = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(loginUser(1));
    }, []);
    const userData = useAppSelector((state) => state?.user);
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '-16px' }}>
            <Box sx={{ justifyContent: 'flex-start', alignItems: 'flex-start', width: '123px' }}>
                <img src={brewImage} alt={'brewImage'} width={'124px'} />
            </Box>
            <Box mt={'25px'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                        src={config.STATIC_PATH + userData?.photo}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default AboutUser;
