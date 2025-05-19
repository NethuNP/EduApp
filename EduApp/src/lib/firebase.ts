import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBjVAOQNeJsSNP6bEnTUPnaFuaHenOlC-A",
  authDomain: "education-app-7de13.firebaseapp.com",
  projectId: "education-app-7de13",
  storageBucket: "education-app-7de13.firebasestorage.app",
  messagingSenderId: "746617097952",
  appId: "1:746617097952:web:2304128cdfa44a4a754a85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export default app;