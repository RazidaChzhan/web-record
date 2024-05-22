import React from 'react';
import { signInWithGoogle } from './firebaseConfig';

const SignInPage = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
    );
};

export default SignInPage;
