import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import "firebase/storage";
// import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBjVAOQNeJsSNP6bEnTUPnaFuaHenOlC-A",
  authDomain: "education-app-7de13.firebaseapp.com",
  projectId: "education-app-7de13",
  storageBucket: "education-app-7de13.firebasestorage.app",
  messagingSenderId: "746617097952",
  appId: "1:746617097952:web:2304128cdfa44a4a754a85"
  
};

export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// secondary auth for eduAdmin creation
export const secondaryApp = initializeApp (firebaseConfig, "secondary");
export const secondaryAuth = getAuth(secondaryApp);

export default app;