import React from 'react';
import './App.css';
import Box from '@mui/material/Box';
import BottomNavBar from './bottomNavBar/BottomNavBar';
import Content from './content/Content';
import useAuth from 'hooks/useAuth';
import useGlobalErrorSnackbar from 'hooks/useGlobalErrorSnackbar';

const App = () => {
    useAuth();
    useGlobalErrorSnackbar();
    return (
        <Box className="App">
            <Content />
            <BottomNavBar />
        </Box>
    );
};

export default App;
