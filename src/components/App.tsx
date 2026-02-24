import React from 'react';
import './App.css';
import BottomNavBar from './bottomNavBar/BottomNavBar';
import useAuth from 'hooks/useAuth';
import useGlobalErrorSnackbar from 'hooks/useGlobalErrorSnackbar';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import useNoAuthHandler from 'hooks/useNoAuthHandler';

const App = () => {
    useAuth();
    useGlobalErrorSnackbar();
    useNoAuthHandler();
    return (
        <Box className="App">
            <Box sx={{ width: {xs: '100%', lg: '80%'}, marginLeft: { xs: 0, lg: '200px' } }}>
                <Outlet />
            </Box>
            <BottomNavBar />
        </Box>
    );
};

export default App;
