import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "dinacademy.firebaseapp.com",
  projectId: "dinacademy",
  storageBucket: "dinacademy.appspot.com",
  messagingSenderId: "286458974781",
  appId: "1:286458974781:web:be29280e9ae0d6af2a1054",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
