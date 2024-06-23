// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "full-stack-estate-cb74a.firebaseapp.com",
  projectId: "full-stack-estate-cb74a",
  storageBucket: "full-stack-estate-cb74a.appspot.com",
  messagingSenderId: "1057470082002",
  appId: "1:1057470082002:web:744046a96d1f53366a360b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
