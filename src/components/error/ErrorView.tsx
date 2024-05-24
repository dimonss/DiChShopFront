import React from 'react';
import errorLogo from 'components/error/images/404.png';
import strings from 'constants/strings';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import colors from 'layout/colors';
import { Link } from 'react-router-dom';
import URLS from 'constants/urls';

const ErrorView = () => {
    return (
        <Grid
            container
            display={'flex'}
            justifyContent={'center'}
            sx={{ height: '100vh' }}
            position={'relative'}>
            <Box
                display={'flex'}
                position={'absolute'}
                justifyContent={'center'}
                alignItems={'center'}
                height={'100vh'}>
                <img src={errorLogo} alt="error 404" width={'260px'} />
            </Box>
            <Box sx={{ bottom: '100px' }} position={'absolute'}>
                <Box sx={{ color: colors.iconActiveColor, textAlign: 'center' }} mb={5}>
                    <h1>{strings.ups}</h1>
                </Box>
                <Link to={URLS.HOME}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '10px',
                            background: colors.iconActiveColor,
                            color: colors.text,
                            minWidth: '72%',
                            fontSize: '16px',
                            height: '45px',
                        }}>
                        <h4>{strings.return_to_home_page}</h4>
                    </Box>
                </Link>
            </Box>
        </Grid>
    );
};

export default ErrorView;
