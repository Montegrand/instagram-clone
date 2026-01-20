import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore, initializeFirestore, memoryLocalCache } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

// Vite HMR 대응: 전역 싱글톤 패턴
const globalForFirebase = globalThis

if (!globalForFirebase.__FIREBASE_APP__) {
  globalForFirebase.__FIREBASE_APP__ = getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApp()
  globalForFirebase.__FIREBASE_AUTH__ = getAuth(globalForFirebase.__FIREBASE_APP__)
  try {
    globalForFirebase.__FIREBASE_DB__ = initializeFirestore(
      globalForFirebase.__FIREBASE_APP__,
      { localCache: memoryLocalCache() },
    )
  } catch {
    globalForFirebase.__FIREBASE_DB__ = getFirestore(globalForFirebase.__FIREBASE_APP__)
  }
  globalForFirebase.__FIREBASE_STORAGE__ = getStorage(globalForFirebase.__FIREBASE_APP__)
}

const app = globalForFirebase.__FIREBASE_APP__
const auth = globalForFirebase.__FIREBASE_AUTH__
const db = globalForFirebase.__FIREBASE_DB__
const storage = globalForFirebase.__FIREBASE_STORAGE__

const firebaseClient = {
  app,
  auth,
  db,
  storage,
}

export { app, auth, db, storage }
export default firebaseClient
