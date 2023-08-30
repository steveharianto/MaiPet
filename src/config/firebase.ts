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
    apiKey: "AIzaSyA-U5WVa4Mq_vVaWw2Jsn_JZt3MRTxCjSA",
    authDomain: "jualanjing-4534a.firebaseapp.com",
    projectId: "jualanjing-4534a",
    storageBucket: "jualanjing-4534a.appspot.com",
    messagingSenderId: "34320284886",
    appId: "1:34320284886:web:bf0aa58a5faf2ec47c9d77",
    measurementId: "G-0R062ESKST",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, storage, auth, provider, app as default };
