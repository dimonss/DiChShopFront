import React from 'react';
import './App.css';
import Box from '@mui/material/Box';
import BottomNavBar from "./bottomNavBar/BottomNavBar";
import Content from "./content/Content";
import SideNavBar from "components/sideNavBar/SideNavBar";

function App() {
    return (
        <Box className='App'>
            <Content/>
            <BottomNavBar/>
            <SideNavBar/>
        </Box>
    );
}

export default App;
