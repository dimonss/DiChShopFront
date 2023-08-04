import React from 'react';
import './App.css';
import Box from '@mui/material/Box';
import BottomNavBar from "./bottomNavBar/BottomNavBar";
import Content from "./content/Content";

function App() {
    return (
        <Box className='App'>
            <Content/>
            <BottomNavBar/>
        </Box>
    );
}

export default App;
