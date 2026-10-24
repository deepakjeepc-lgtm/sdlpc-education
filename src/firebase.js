import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

/**
 * SDLPC Firebase Configuration
 * All credentials securely injected via Vite environment variables (.env.local).
 * Never hardcoded in source control.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "sdlpcx.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "sdlpcx",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "sdlpcx.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "927609232771",
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore database
export const db = getFirestore(app);
export default app;
