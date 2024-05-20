import './App.css';
import React from 'react';
import { IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

export function MicrophonePage () {

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

    const handleClickDownload = () => {
        console.log('download');
    };

    return (
        <div style={styles.main}>
            <IconButton style={styles.download} variant="contained" onClick={handleClickDownload}>
                <FileDownloadOutlinedIcon />
            </IconButton>
            <IconButton style={styles.circleButtonStyle} variant="contained">
                <MicIcon sx={{ fontSize: 90 }} />
            </IconButton>
        </div>
    );
}
