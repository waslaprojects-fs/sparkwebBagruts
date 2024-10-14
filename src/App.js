import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Header from './tools/header';
import Home from './screens/homeScreen/home.js';
import Dawrat from './screens/dawrat/dawrat.js';
import ExamsScreen from './screens/ExamsScreen/examsScreen.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';  // This imports both Bootstrap and Popper.js
import EX801 from './screens/ExamsScreen/801.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dawrat" element={<Dawrat />} />
          <Route path="/examsScreen" element={<ExamsScreen />} />
          <Route path="/801" element={<EX801 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
