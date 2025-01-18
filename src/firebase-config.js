import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDX-vvxS67Cayv6WSEb2r2QLa5SOkGStbU",
  authDomain: "votacion-7355d.firebaseapp.com",
  projectId: "votacion-7355d",
  storageBucket: "votacion-7355d.appspot.com",
  messagingSenderId: "1077960152588",
  appId: "1:1077960152588:web:dc8d934d55748fdc7f0029",
  measurementId: "G-ZPQ9FXFZ12",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
