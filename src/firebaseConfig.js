// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getMessaging } from "firebase/messaging";
import { getStorage } from "firebase/storage";
import { getRemoteConfig } from "firebase/remote-config";
import { getPerformance } from "firebase/performance";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLckaBgQ8oP7ZL8JcON_QTAHAsIz9b20M",
  authDomain: "sparkbagrut.firebaseapp.com",
  projectId: "sparkbagrut",
  storageBucket: "sparkbagrut.appspot.com",
  messagingSenderId: "847207233604",
  appId: "1:847207233604:web:2e6b922f527cd47ea86411",
  measurementId: "G-EC8627LXCS"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const database = getDatabase(app);
const firestore = getFirestore(app);
const functions = getFunctions(app);
const messaging = getMessaging(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);
const remoteConfig = getRemoteConfig(app);
const performance = getPerformance(app);

export { app, auth, database, firestore, functions, messaging, storage, analytics, remoteConfig, performance };
