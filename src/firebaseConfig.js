import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

// Firebase configuration
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
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

