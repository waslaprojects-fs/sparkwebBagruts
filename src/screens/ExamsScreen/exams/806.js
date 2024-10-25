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

// Fetch URLs Function
export const fetchBagrutURLs = async () => {
  const currentList = [];

  // Loop through the years from 2023 to 2017
  for (let j = 23; j >= 17; j--) {
    const year = 2000 + j;  // Converting to a full year format, e.g., 2023
    const sessionData = {
      [year]: {
        "صيف موعد ب": {
          ex: null,
          sol: null
        },
        "صيف موعد أ": {
          ex: null,
          sol: null
        },
        "شتاء": {
          ex: null,
          sol: null
        }
      }
    };

    try {
      // Fetch URLs for "صيف موعد ب"
      sessionData[year]["صيف موعد ب"].ex = await getDownloadURL(ref(storage, `806/${j}b.pdf`));
      sessionData[year]["صيف موعد ب"].sol = await getDownloadURL(ref(storage, `806/${j}b.pdf`));
      
      // Fetch URLs for "صيف موعد أ"
      sessionData[year]["صيف موعد أ"].ex = await getDownloadURL(ref(storage, `806/${j}a.pdf`));
      sessionData[year]["صيف موعد أ"].sol = await getDownloadURL(ref(storage, `806/${j}a.pdf`));
      
      // Fetch URLs for "شتاء"
      sessionData[year]["شتاء"].ex = await getDownloadURL(ref(storage, `806/${j}.pdf`));
      sessionData[year]["شتاء"].sol = await getDownloadURL(ref(storage, `806/${j}.pdf`));
      
      // Add the structured data for the year to the list
      currentList.push(sessionData);
    } catch (error) {
      console.error(`Error fetching file URL for year ${year}:`, error);
    }
  }
  console.log("hi");
  console.log(currentList);
  return currentList;
};
