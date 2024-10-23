import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './tools/header';
import Home from './screens/homeScreen/home.js';
import Dawrat from './screens/dawrat/dawrat.js';
import ExamsScreen from './screens/ExamsScreen/examsScreen.js'
import EX801 from './screens/ExamsScreen/801.js';
import Footer from './tools/footer.js';

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
