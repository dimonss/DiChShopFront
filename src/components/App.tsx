import React from 'react';
import './App.css';
import BottomNavBar from './bottomNavBar/BottomNavBar';
import useAuth from 'hooks/useAuth';
import useGlobalErrorSnackbar from 'hooks/useGlobalErrorSnackbar';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';

const App = () => {
    useAuth();
    useGlobalErrorSnackbar();
    return (
        <Box className="App">
            <Outlet />
            <BottomNavBar />
        </Box>
    );
};

export default App;
