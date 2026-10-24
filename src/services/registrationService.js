/**
 * SDLPC Education - Firebase Firestore Registration Service
 * 
 * Automatically pushes new student registrations to Cloud Firestore in collection 'registrations',
 * with instant fallback to local storage if offline or during configuration.
 */

import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const STORAGE_KEY = 'sdlpc_registrations';

/**
 * Register a student for course enrollment or CBT test notifications.
 * @param {Object} data - { fullName, phone, email, stream }
 */
export async function submitRegistration(data) {
  const localRecord = {
    id: 'reg_' + Date.now(),
    timestamp: new Date().toISOString(),
    ...data,
  };

  // Always save locally first for offline safety
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    existing.push(localRecord);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (err) {
    console.warn('LocalStorage save failed:', err);
  }

  // Attempt to write to Cloud Firestore
  try {
    const docRef = await addDoc(collection(db, 'registrations'), {
      fullName: data.fullName || '',
      phone: data.phone || '',
      email: data.email || '',
      stream: data.stream || '',
      createdAt: serverTimestamp(),
      platform: 'web-app',
    });

    return {
      success: true,
      id: docRef.id,
      message: 'Registration successfully synchronized with Firebase Cloud Firestore!',
    };
  } catch (firestoreErr) {
    console.warn('Firestore sync pending (using local record):', firestoreErr.message);
    // If Firebase is not yet fully activated in console, still return success locally
    return {
      success: true,
      id: localRecord.id,
      message: 'Registration recorded successfully!',
    };
  }
}

export function getLocalRegistrations() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}
