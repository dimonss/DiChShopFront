import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import URLS from 'constants/urls';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './goToCartButton.css';

interface PropI {
    inCart?: boolean;
}

const GoToCartButton: React.FC<PropI> = ({ inCart }) => {
    const navigate = useNavigate();
    return (
        <Box
            className={inCart ? 'jump': 'hide'}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'fixed',
                backgroundColor: 'rgba(64.81, 64.81, 64.81, 0.50)',
                height: 40,
                width: 40,
                right: 14,
                bottom: inCart ? 80 : '-40px',
                zIndex: 2,
                borderRadius: '50%',
                backdropFilter: 'blur(10px)',
            }}
            onClick={() => {
                navigate(URLS.CART);
            }}>
            <ShoppingCartIcon />
        </Box>
    );
};

export default GoToCartButton;
