// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEqxIlVwEPdO6W8oMJT6xMMzhyTTtiG3Q",
  authDomain: "gearup-rentals-66f77.firebaseapp.com",
  projectId: "gearup-rentals-66f77",
  storageBucket: "gearup-rentals-66f77.appspot.com", // I corrected this for you from .firebasestorage.app
  messagingSenderId: "41416783757",
  appId: "1:41416783757:web:c79d1a4cee74db5c616fc4",
  measurementId: "G-DT9VMQ6TFE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app); // This line is now correctly placed after 'app' is created

export { app, auth, db, storage };
