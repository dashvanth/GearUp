// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // <-- ADD THIS IMPORT

// Your web app's Firebase configuration
// Make sure your actual config is here, especially the storageBucket
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com", // This line is crucial for uploads
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // <-- ADD THIS LINE TO INITIALIZE STORAGE

// --- CORE TYPE DEFINITIONS ---
export type UserRole = "owner" | "renter";

export interface AuthUser {
  id: string;
  email: string | null;
  role: UserRole;
}

export { app, auth, db, storage }; // <-- ADD `storage` TO THE EXPORT LIST
