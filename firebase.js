// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXOJ3345A0QqLgby5nrsmUZ_cH69D6lTU",
  authDomain: "facebook-768f8.firebaseapp.com",
  projectId: "facebook-768f8",
  storageBucket: "facebook-768f8.appspot.com",
  messagingSenderId: "708810863887",
  appId: "1:708810863887:web:cf8c5e748d7072ccb97a7a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();

export { db, app, storage };
