import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCCT8rOQtpePUZtVqUtJH3R_YgufWU2H0g",
  authDomain: "blogs-app-79499.firebaseapp.com",
  projectId: "blogs-app-79499",
  storageBucket: "blogs-app-79499.appspot.com",
  messagingSenderId: "271423277422",
  appId: "1:271423277422:web:575ea4306c3a88dc32997f",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
