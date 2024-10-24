import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './tools/header';
import Home from './screens/homeScreen/home.js';
import Dawrat from './screens/dawrat/dawrat.js';
import ExamsScreen from './screens/ExamsScreen/examsScreen.js'
import EX801 from './screens/ExamsScreen/801.js';
import Footer from './tools/footer.js';
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBLckaBgQ8oP7ZL8JcON_QTAHAsIz9b20M",
//   authDomain: "sparkbagrut.firebaseapp.com",
//   projectId: "sparkbagrut",
//   storageBucket: "sparkbagrut.appspot.com",
//   messagingSenderId: "847207233604",
//   appId: "1:847207233604:web:2e6b922f527cd47ea86411",
//   measurementId: "G-EC8627LXCS"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

function App() {
  return (
    <Router>
      <section className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dawrat" element={<Dawrat />} />
          <Route path="/examsScreen" element={<ExamsScreen />} />
          <Route path="/exams" element={<EX801 />} />

        </Routes>
        <Footer/>
      </section>
    </Router>
  );
}

export default App;
