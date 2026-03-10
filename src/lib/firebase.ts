import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJI5pyl99KYVatYZ7YSYn2sff0GuMuy3Q",
  authDomain: "seopulse-ce02c.firebaseapp.com",
  projectId: "seopulse-ce02c",
  storageBucket: "seopulse-ce02c.firebasestorage.app",
  messagingSenderId: "371936540565",
  appId: "1:371936540565:web:d67a39771443130b5e689c",
  measurementId: "G-PGC7VBW0MT",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
