import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXbTcmYfqtOW8JA_ARPpAlF_cZgY_d4dY",
  authDomain: "buhooocrm.firebaseapp.com",
  projectId: "buhooocrm",
  storageBucket: "buhooocrm.firebasestorage.app",
  messagingSenderId: "27867218795",
  appId: "1:27867218795:web:dcc9b26bb153d00abe822e",
  measurementId: "G-NEH85NTMGJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
