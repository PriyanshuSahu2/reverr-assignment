// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDH2C5GsexvS7In6sOGib93cNE_0ZIleDc",
    authDomain: "reverr-1a66a.firebaseapp.com",
    projectId: "reverr-1a66a",
    storageBucket: "reverr-1a66a.appspot.com",
    messagingSenderId: "500178568206",
    appId: "1:500178568206:web:928cd298e1b3744fa4a85f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)