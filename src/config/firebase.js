
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhcsUyLxIkiEiBdYJJXiGjWM5KgpTEWZQ",
  authDomain: "transaction-management-s-3027d.firebaseapp.com",
  projectId: "transaction-management-s-3027d",
  storageBucket: "transaction-management-s-3027d.firebasestorage.app",
  messagingSenderId: "199515548980",
  appId: "1:199515548980:web:3cfc1f2006d89e97c18961",
  measurementId: "G-T3K49183GT"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);