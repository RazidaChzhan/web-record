import './App.css';
import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
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
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

function ArchivePage() {

    const styles = {
        main: {
            backgroundColor: '#282c34',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            position: 'relative',
            height: '100%'
        },
        download: {
            position: 'absolute',
            top: '20px',
            right: '20px',
            color: 'white'
        },
        downloadMicro: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: '20px',
            width: '100%'
        },
        circleButtonStyle: {
            backgroundColor: 'white',
            borderRadius: '50%',
            padding: '10px',
            color: 'black',
            margin: '0 12px',
            border: '2px solid transparent', // добавлено для создания круглой формы
        },
        bottomNavigation: {
            width: '100%',
            backgroundColor: '#282c34',
            color: 'white',
            position: 'fixed',
            bottom: 0,
            boxShadow: 'none',
        },
        selectedCircleButtonStyle: {
            backgroundColor: '#ffffff',
            borderRadius: '50%',
            padding: '10px',
            color: 'black',
            margin: '0 12px',
            border: '2px solid white', // добавлено для создания круглой формы и выделения
        }
    };

    return (
        <div style={styles.main}>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
        </div>
    );
}

export default ArchivePage;
