// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-55c5f.firebaseapp.com",
  projectId: "real-estate-55c5f",
  storageBucket: "real-estate-55c5f.appspot.com",
  messagingSenderId: "681269603508",
  appId: "1:681269603508:web:aa8ddaf3c3cd250c787be1",
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
