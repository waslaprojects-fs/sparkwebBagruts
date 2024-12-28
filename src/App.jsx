import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./styles/tailwind.css";
import Header from "./tools/header.jsx";
import Home from "./screens/homeScreen/home.jsx";
import Dawrat from "./screens/dawrat/dawrat.jsx";
import ExamsScreen from "./screens/ExamsScreen/examsScreen.jsx";
import MathPage from "./screens/ExamsScreen/math.jsx";
import Footer from "./tools/footer.jsx";
import NotFound from "./screens/NotFound.jsx"; // Create a NotFound component
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
// Prevent zoom on double-tap
document.addEventListener(
  "dblclick",
  function (event) {
    event.preventDefault();
  },
  { passive: false }
);

// Prevent zoom on pinch gesture (for mobile devices)
document.addEventListener(
  "touchstart",
  function (event) {
    if (event.touches.length > 1) {
      event.preventDefault(); // Prevents pinch-zoom
    }
  },
  { passive: false }
);

document.addEventListener(
  "touchmove",
  function (event) {
    if (event.scale && event.scale !== 1) {
      event.preventDefault(); // Prevents zooming during touchmove
    }
  },
  { passive: false }
);

// Prevent zoom with keyboard shortcuts (for desktop browsers)
document.addEventListener(
  "wheel",
  function (event) {
    if (event.ctrlKey) {
      event.preventDefault(); // Prevents zooming with Ctrl + scroll
    }
  },
  { passive: false }
);

document.addEventListener("keydown", function (event) {
  if (
    (event.ctrlKey || event.metaKey) &&
    (event.key === "+" || event.key === "-" || event.key === "0")
  ) {
    event.preventDefault(); // Prevents zooming with Ctrl/Cmd + (+, -, 0)
  }
});

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
          <Route path="/exams/exams801" element={<MathPage />} />
          <Route path="/exams802" element={<MathPage />} />
          <Route path="/exams803" element={<MathPage />} />
          <Route path="/exams804" element={<MathPage />} />
          <Route path="/exams805" element={<MathPage />} />
          <Route path="/exams806" element={<MathPage />} />
          <Route path="/exams807" element={<MathPage />} />
          <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
        </Routes>
        <Footer />
      </section>
    </Router>
  );
}
export default App;
