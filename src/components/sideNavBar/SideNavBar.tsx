import React, { useEffect, useMemo } from 'react';
import colors from 'layout/colors';
import transitions from 'layout/transitions';
import Box from '@mui/material/Box';
import useWindowSize from 'hooks/useWindowSize';
import { useAppDispatch, useAppSelector } from 'types/globalTypes';
import { fetchCategory } from 'redux/slices/contentSlice';
import { useSearchParams } from 'react-router-dom';

const SideNavBar = () => {
    const { loggedIn } = useAppSelector((state) => state?.user);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchCategory());
    }, [loggedIn]);
    useWindowSize();
    const categories = useAppSelector((state) => state?.content?.category);
    const categoriesWithDefaultValue = useMemo(
        () => [{ id: -1, name: 'all' }, ...categories],
        [categories],
    );
    const [params, setSearchParams] = useSearchParams();
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
            <Box
                sx={{
                    overflowY: 'scroll',
                    marginTop: '30px',
                }}>
                {categoriesWithDefaultValue.map((item) => (
                    <Box
                        key={item.id}
                        sx={{
                            color:
                                params.get('category') === String(item.id)
                                    ? colors.iconActiveColor
                                    : colors.iconDefaultColor,
                            ...transitions.color,
                            writingMode: 'vertical-rl',
                            rotate: '180deg',
                            display: 'flex',
                            justifyContent: 'space-around',
                            cursor: 'pointer',
                            outline: 'none',
                            marginBottom: '22px',
                        }}
                        onClick={() => {
                            const search = params.get('search') || '';
                            setSearchParams({ category: String(item.id), search });
                        }}>
                        {item.name}
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default SideNavBar;
