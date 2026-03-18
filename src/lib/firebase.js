import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Check if Firebase is configured
const isConfigured = Object.values(firebaseConfig).every(val => val);

let app = null;
let analytics = null;
let db = null;
let auth = null;

if (isConfigured) {
    try {
        app = initializeApp(firebaseConfig);
        analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
        db = getFirestore(app);
        auth = getAuth(app);
    } catch (error) {
        console.warn('[Firebase] Initialization error:', error.message);
    }
} else {
    console.warn('[Firebase] Firebase not configured. Set VITE_FIREBASE_* environment variables in .env file.');
}

export { app, analytics, db, auth, isConfigured };
