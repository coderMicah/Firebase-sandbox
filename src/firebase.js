// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfRWEP76NL8xu6ZH-k_ldQR3r720uxTmg",
  authDomain: "sandbox-ea0b6.firebaseapp.com",
  projectId: "sandbox-ea0b6",
  storageBucket: "sandbox-ea0b6.appspot.com",
  messagingSenderId: "311681563767",
  appId: "1:311681563767:web:da2db591dd853e15685a72",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db = getFirestore();
export const auth = getAuth()
