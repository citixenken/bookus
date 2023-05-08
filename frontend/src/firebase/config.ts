import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "bookus-web-app.firebaseapp.com",
  projectId: "bookus-web-app",
  storageBucket: "bookus-web-app.appspot.com",
  messagingSenderId: "755566074560",
  appId: "1:755566074560:web:38ef7ebd50bd2ef8852b25",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider(app);
