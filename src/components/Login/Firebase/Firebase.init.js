// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3E2IruxiYjLnAdce79DHJPRhOX_qSDLQ",
  authDomain: "ayen-traders.firebaseapp.com",
  projectId: "ayen-traders",
  storageBucket: "ayen-traders.appspot.com",
  messagingSenderId: "1049414483526",
  appId: "1:1049414483526:web:e3bf40443fc7a45a4f9447",
  measurementId: "G-SBPJ4PMT0M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app
