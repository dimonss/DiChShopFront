import React, { useEffect, useState } from 'react';
import colors from 'layout/colors';
import transitions from 'layout/transitions';
import Box from '@mui/material/Box';
import useWindowSize from 'hooks/useWindowSize';
import { useAppDispatch, useAppSelector } from 'types/globalTypes';
import { fetchCategory } from 'redux/slices/contentSlice';

const SideNavBar = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchCategory());
    }, []);
    useWindowSize();
    const [activePage, setActivePage] = useState(0);
    const categories = useAppSelector((state) => state?.content?.category);
    return (
        <Box
            sx={{
                height: '452px',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                background: colors.sideNavBarBG,
                position: 'fixed',
                bottom: '78px',
                left: `${window.innerWidth <= 425 ? 0 : window.innerWidth / 2 - 212}px`,
                width: '32px',
                borderTopRightRadius: '60px',
                fontSize: '14px',
            }}>
            {categories.map((item, index) => (
                <Box
                    key={index}
                    sx={{
                        color: activePage === index ? colors.iconActiveColor : colors.iconDefaultColor,
                        ...transitions.color,
                        writingMode: 'vertical-rl',
                        rotate: '180deg',
                        display: 'flex',
                        justifyContent: 'space-around',
                        cursor: 'pointer',
                        outline: 'none',
                    }}
                    onClick={() => {
                        setActivePage(index);
                    }}>
                    {item.name}
                </Box>
            ))}
        </Box>
    );
};

export default SideNavBar;
