import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBLckaBgQ8oP7ZL8JcON_QTAHAsIz9b20M",
  authDomain: "sparkbagrut.firebaseapp.com",
  projectId: "sparkbagrut",
  storageBucket: "sparkbagrut.appspot.com",
  messagingSenderId: "847207233604",
  appId: "1:847207233604:web:2e6b922f527cd47ea86411",
  measurementId: "G-EC8627LXCS",
};

const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export { firebaseApp, auth, storage };
