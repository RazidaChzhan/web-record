// src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import MicNoneIcon from '@mui/icons-material/MicNone';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ArchiveMain from './archive/components/archive-main-component';
import { MicrophonePage } from "./MicrophonePage";
import Digest from './archive/components/digest-component';
import SignInPage from './SignInPage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {
    const location = useLocation();
    const [value, setValue] = useState(location.pathname);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        setValue(location.pathname);
    }, [location]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    if (!user) {
        return <SignInPage />;
    }

    return (
        <>
            <Routes>
                <Route path="/microphone" element={<MicrophonePage />} />
                <Route path="/archive" element={<ArchiveMain />} />
                <Route path="/" element={<Navigate to="/microphone" />} />
                <Route path="/digest/:transcription_id" element={<Digest />} />
            </Routes>
            <BottomNavigation
                value={value}
                onChange={handleChange}
                style={{ backgroundColor: '#000000', position: 'fixed', bottom: 0, width: '100%' }}
            >
                <BottomNavigationAction
                    component={Link}
                    to="/microphone"
                    icon={<MicNoneIcon style={{ color: value === '/microphone' ? 'white' : 'grey' }} />}
                    value="/microphone"
                    sx={{ border: 'none' }}  // Удаляем рамку
                />
                <BottomNavigationAction
                    component={Link}
                    to="/archive"
                    icon={<Inventory2OutlinedIcon style={{ color: value === '/archive' ? 'white' : 'grey' }} />}
                    value="/archive"
                    sx={{ border: 'none' }}  // Удаляем рамку
                />
            </BottomNavigation>
        </>
    );
}

export default App;
