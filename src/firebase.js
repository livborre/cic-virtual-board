// import firebase from "firebase";
import firebase from "firebase/app";
import 'firebase/firestore';
import "firebase/auth";
import "firebase/";
import setupDb from "./db";

const firebaseConfig = {
    apiKey: "AIzaSyCiir9bnMj0GHe3MqzKDI4hpjIU_dMnoCU",
    authDomain: "cic-virtual-board.firebaseapp.com",
    projectId: "cic-virtual-board",
    storageBucket: "cic-virtual-board.appspot.com",
    messagingSenderId: "452449462478",
    appId: "1:452449462478:web:668afc98ee276f85f4489f",
    measurementId: "G-EH0R807V37"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

export const auth = firebaseApp.auth();
export const db = setupDb(firebaseApp);
export default firebaseApp;

