import React from 'react';
import Box from "@mui/material/Box";
import StarIcon from '@mui/icons-material/Star';
import coffeeImage from 'images/content/coffee.png'
import colors from 'layout/colors';
import color from 'layout/colors';
import AddIcon from '@mui/icons-material/Add';

const CardProduct = () => {
    return (
        <Box
            p="14px"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '10px',
                background: colors.cardBG,
                margin: '0 12px 12px 0',
            }}>
            <Box sx={{ overflow: 'hidden', position: 'relative'}}>
                <Box sx={{
                    height: '20px',
                    width: '40px',
                    position: 'absolute',
                    borderBottomRightRadius: '10px',
                    borderTopLeftRadius: '10px',
                    background: 'white',
                    opacity: '0.3',
                    overflow: 'hidden'
                }}></Box>
                <Box sx={{display: 'flex', position: 'absolute', fontSize: '10px', left: '6px'}}>
                    <StarIcon fontSize="small" sx={{width: '14px', color: colors.yellow}}/>
                    <Box sx={{
                        display: 'flex',
                        justifyItems: 'center',
                        alignItems: 'center',
                        marginLeft: '4px',
                    }}>4.5</Box>
                </Box>
                <Box sx={{
                    paddingTop: '-100px',
                    margin: 'auto',
                    height: '110px',
                    width: '110px',
                    borderRadius: '15px',
                    overflow: 'hidden',
                    padding: '0',
                    backgroundImage: `url(${coffeeImage})`,
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                }}>
                </Box>
            </Box>
            <Box sx={{textAlign: 'left', marginBottom: '14px'}}>Cinnamon & Cocoa</Box>
            <Box sx={{
                display: 'flex',
                position: 'relative',
                width: '100%',
                background: color.costBG,
                alignItems: 'center',
                borderRadius: '8px',
                height: '34px',
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexGrow: '6',
                }}><b>99c</b></Box>
                <Box sx={{
                    flexGrow: '1',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '4px 0',
                    background: colors.iconActiveColor,
                    color: colors.primary,
                    borderRadius: '8px',
                    scale: '1.3',
                }}><AddIcon fontSize='small'/></Box>
            </Box>
        </Box>
    );
};

export default CardProduct;