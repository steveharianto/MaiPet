// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCUcY_tH7ymxwwlVi5uVJfj-2dRvG0454M",
    authDomain: "jualanjing-ef571.firebaseapp.com",
    projectId: "jualanjing-ef571",
    storageBucket: "jualanjing-ef571.firebasestorage.app",
    messagingSenderId: "665449981700",
    appId: "1:665449981700:web:8d4225a5d74b1085d75251",
    measurementId: "G-LLWRPJM8EJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, storage, auth, provider, app as default };
