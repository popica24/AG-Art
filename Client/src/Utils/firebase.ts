// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCnQVzhGwdjfCwb26Q_iI2U51cVMiYJ52g",
  authDomain: "agart-dev.firebaseapp.com",
  projectId: "agart-dev",
  storageBucket: "agart-dev.appspot.com",
  messagingSenderId: "880580118060",
  appId: "1:880580118060:web:aa970e7fabf46b48af7389",
  measurementId: "G-DSY75Y6VCL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);
export const auth = getAuth(app);
export default app;
