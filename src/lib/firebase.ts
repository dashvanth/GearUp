// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEqxIlVwEPdO6W8oMJT6xMMzhyTTtiG3Q",
  authDomain: "gearup-rentals-66f77.firebaseapp.com",
  projectId: "gearup-rentals-66f77",
  storageBucket: "gearup-rentals-66f77.firebasestorage.app",
  messagingSenderId: "41416783757",
  appId: "1:41416783757:web:c79d1a4cee74db5c616fc4",
  measurementId: "G-DT9VMQ6TFE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// --- PASTE YOUR FIREBASE CONFIGURATION FROM THE FIREBASE CONSOLE HERE ---

// Initialize Firebase

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Define user roles
export type UserRole = "admin" | "owner" | "renter";

// Define the structure of your authenticated user
export interface AuthUser {
  id: string;
  email: string | null;
  role: UserRole;
}

export { app, auth, db };
