import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'


const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "aicode-editor-24d4e.firebaseapp.com",
  projectId: "aicode-editor-24d4e",
  storageBucket: "aicode-editor-24d4e.firebasestorage.app",
  messagingSenderId: "710965833813",
  appId: "1:710965833813:web:22df1209a1c568121864dc",
  measurementId: "G-RYXV8P2W4T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 export const auth = getAuth(app)

export const googleProvider =new GoogleAuthProvider();