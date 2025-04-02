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
    const [params, setSearchParams] = useSearchParams();
    useEffect(() => {
        dispatch(fetchCategory());
        setSearchParams({ category: '-1', search: params.get('search') || '' });

    }, [loggedIn]);
    useWindowSize();
    const categories = useAppSelector((state) => state?.content?.category);
    const categoriesWithDefaultValue = useMemo(
        () => [{ id: -1, name: 'Все Категории' }, ...categories],
        [categories],
    );
    return (
        <Box
            sx={{
                height: '476px',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                background: colors.sideNavBarBG,
                position: 'fixed',
                bottom: '78px',
                left: `${window.innerWidth <= 430 ? 0 : window.innerWidth / 2 - 215}px`,
                width: '32px',
                borderTopRightRadius: '60px',
                fontSize: '14px',
                marginBottom: '-24px',
                paddingBottom: '24px'
            }}>
            <Box
                sx={{
                    overflowY: 'scroll',
                    marginTop: '10px',
                }}>
                {categoriesWithDefaultValue?.map((item) => (
                    <Box
                        key={item.id}
                        sx={{
                            color:
                                params.get('category') === String(item.id)
                                    ? colors.iconActiveColor
                                    : colors.iconDefaultColor,
                            ...transitions.color,
                            cursor: 'pointer',
                            transform: 'rotate(-90deg)',
                            marginTop: `calc(6px * ${item?.name?.length})`,
                            marginBottom: `calc(6px * ${item?.name?.length})`,
                            whiteSpace: 'nowrap',
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
