import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Header from './tools/header';
import Home from './screens/homeScreen/home.js';
import Dawrat from './screens/dawrat/dawrat.js';
import ExamsScreen from './screens/ExamsScreen/examsScreen.js'
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
