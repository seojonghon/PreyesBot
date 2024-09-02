// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from './components/Home';
import DataDisplay from './components/DataDisplay';
import './css/App.css'; // CSS 파일 import

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/data">데이터 보기</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/data" element={<DataDisplay />} />
      </Routes>
    </Router>
  );
}

export default App;
