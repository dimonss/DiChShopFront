import React, {useState} from 'react';
import color from "layout/colors";
import transitions from "layout/transitions";
import Box from "@mui/material/Box";

const menuList = ['Cappuccino', 'Latte', 'Americano', 'Espresso', 'FlatWhite'];

const SideNavBar = () => {
    const [activePage, setActivePage] = useState(0);
    return (
        <Box sx={{
            height: '452px',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            background: color.sideNavBarBG,
            position: 'fixed',
            bottom: '78px',
            left: '-20px',
            width: '36px',
            borderTopRightRadius: '60px',
            padding: '20px 0 0 18px',
            fontSize: "14px",

        }}>
            {menuList.map((item, index) => (
                <Box
                    sx={{
                        color: activePage === index ? color.iconActiveColor : color.iconDefaultColor, ...transitions.color,
                        writingMode: 'vertical-rl',
                        rotate: '180deg',
                        display: 'flex',
                        justifyContent: 'space-around'
                    }}
                    onClick={() => {
                        setActivePage(index)
                    }}>{item}</Box>
            ))}
        </Box>
    );
};

export default SideNavBar;