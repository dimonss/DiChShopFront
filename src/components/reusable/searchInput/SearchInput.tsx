import React, { useCallback, ChangeEvent } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useSearchParams } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '8px',
    backgroundColor: '#171017',
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: '#B9AE9B',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 7),
        // vertical padding + font size from searchIcon
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));
const SearchInput = () => {
    const [params, setSearchParams] = useSearchParams();
    const searchHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearchParams({ search: e.target.value });
    }, []);
    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon sx={{ color: '#B9AE9B' }} />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Browse your favourite coffee…"
                inputProps={{ 'aria-label': 'search' }}
                fullWidth
                value={params.get('search') || ''}
                onChange={searchHandler}
            />
        </Search>
    );
};

export default SearchInput;
