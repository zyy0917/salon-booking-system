import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// NEW: Import Authentication functions
import { getAuth } from "firebase/auth";

const firebaseConfig = {
 apiKey: "AIzaSyCTldkbGhB4mhIbOmmu2F8EOiZyGJZe04Q",
  authDomain: "salonbooking-8009f.firebaseapp.com",
  projectId: "salonbooking-8009f",
  storageBucket: "salonbooking-8009f.firebasestorage.app",
  messagingSenderId: "635030636496",
  appId: "1:635030636496:web:8556b193e9e907176c5bd5",
  measurementId: "G-K0JS235GXT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Database
export const db = getFirestore(app);

// NEW: Initialize and Export Authentication
export const auth = getAuth(app);