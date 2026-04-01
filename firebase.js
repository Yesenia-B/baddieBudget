// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADgv3ovXwp8uewb6csJ1WYxdAGNh9VToM",
  authDomain: "baddiebudget-586e9.firebaseapp.com",
  projectId: "baddiebudget-586e9",
  storageBucket: "baddiebudget-586e9.firebasestorage.app",
  messagingSenderId: "893038431496",
  appId: "1:893038431496:web:ef43d11bfe48f61e73f0bd",
  measurementId: "G-EVLWB1GZF3"
};

// Initializing Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);
const auth = getAuth(app);

// Export database
export {app,auth, db};