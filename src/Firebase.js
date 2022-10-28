//initialise firebase here
    // Import the functions you need from the SDKs you need

import { FirebaseError, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDn0eEyFxhfC8uu6IMHPnMCFrU98ELeNA0",
    authDomain: "project3-d2d2c.firebaseapp.com",
    databaseURL: "https://project3-d2d2c-default-rtdb.firebaseio.com",
    projectId: "project3-d2d2c",
    storageBucket: "project3-d2d2c.appspot.com",
    messagingSenderId: "929985143498",
    appId: "1:929985143498:web:65ebe494f315c441a5ca33"
};


// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

//export 
export default firebase;
