// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "smartstoriesofficalv1.firebaseapp.com",
  projectId: "smartstoriesofficalv1",
  storageBucket: "smartstoriesofficalv1.firebasestorage.app",
  messagingSenderId: "550304761319",
  appId: "1:550304761319:web:4bfd9ef146fe3079306942"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };