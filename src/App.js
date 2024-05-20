import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import MicNoneIcon from '@mui/icons-material/MicNone';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ArchivePage from './ArchivePage';
import {MicrophonePage} from "./MicrophonePage";

function App() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Router>
            <Routes>
                <Route path="/microphone" element={<MicrophonePage />} />
                <Route path="/archive" element={<ArchivePage />} />
                <Route path="/" element={<Navigate to="/microphone" />} />
            </Routes>

            <BottomNavigation value={value} onChange={handleChange} style={{backgroundColor: '#282c34', position: 'fixed', bottom: 0, width: '100%' }}>
                <BottomNavigationAction
                    component={Link}
                    to="/microphone"
                    icon={<MicNoneIcon style={{color: 'grey'}} />}
                    className={value === 0 ? 'active' : ''}
                />
                <BottomNavigationAction
                    component={Link}
                    to="/archive"
                    icon={<Inventory2OutlinedIcon style={{color: 'grey'}}/>}
                    className={value === 1 ? 'active' : ''}
                />
            </BottomNavigation>
        </Router>
    );
}

export default App;
