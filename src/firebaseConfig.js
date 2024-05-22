import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC6O897aMWq6E30sDTyhpZ4m4ilC_Q8syU",
    authDomain: "web-record-74d32.firebaseapp.com",
    projectId: "web-record-74d32",
    storageBucket: "web-record-74d32.appspot.com",
    messagingSenderId: "1018494264356",
    appId: "1:1018494264356:web:806e5c84c44c5c5e59a4b1",
    measurementId: "G-8C5WWPCEP9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log(user);
    } catch (error) {
        console.error(error);
    }
};

export { auth, signInWithGoogle };
