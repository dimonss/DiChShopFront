import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from "@mui/material/Box";
import brewImage from "images/Brew.png";
import userImg from 'images/user.png';

const AboutUser = () => {
    return (
        <Box sx={{display: 'flex', justifyContent: 'space-between', marginTop:"-16px"}}>
            <Box sx={{justifyContent: 'flex-start', alignItems: 'flex-start', width: '123px'}}>
                <img src={brewImage} alt={'brewImage'} width={'124px'}/>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Box sx={{

                    border: '1px #DCAA70 solid',
                    borderRadius: '50%',
                    padding: '2px',
                    height: '50px',
                    width: '50px'
                }}><Avatar alt="Remy Sharp" sx={{
                    height: '50px',
                    width: '50px'
                }}
                           src={userImg}/></Box>
            </Box>
        </Box>
    );
};


export default AboutUser;