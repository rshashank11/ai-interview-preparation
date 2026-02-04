import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "ai-interview-preparation-c7f69.firebaseapp.com",
  projectId: "ai-interview-preparation-c7f69",
  storageBucket: "ai-interview-preparation-c7f69.firebasestorage.app",
  messagingSenderId: "294641238397",
  appId: "1:294641238397:web:60df59126578f6d3298c14",
  measurementId: "G-LQYKH0B3EJ"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);