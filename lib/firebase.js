// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyABvB-B8OH6IaA1Qwe3foKgGts5WAYPYa0',
  authDomain: 'fingerate.firebaseapp.com',
  projectId: 'fingerate',
  storageBucket: 'fingerate.appspot.com',
  messagingSenderId: '660504480149',
  appId: '1:660504480149:web:9ce6b18335c0f3e4940e9c',
  measurementId: 'G-J2LQNZBPWY',
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
}
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);

// connectAuthEmulator(auth, 'http://localhost:9099');
// connectFirestoreEmulator(db, 'http://localhost:8080');
