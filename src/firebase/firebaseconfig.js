// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAGvlKt4pItzsmn4nXoJcow-1L99-73YQ",
  authDomain: "tutorial-f7.firebaseapp.com",
  projectId: "tutorial-f7",
  storageBucket: "tutorial-f7.appspot.com",
  messagingSenderId: "617257921502",
  appId: "1:617257921502:web:1e4f605155aae356a48b4f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
