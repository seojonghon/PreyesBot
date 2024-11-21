import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import DataDisplay from './components/DataDisplay';
import MyPage from './components/Mypage'; // Mypage 컴포넌트 import

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/data">AI 투자</Link>
          </li>
          <li>
            <Link to="/mypage">내 페이지</Link> {/* Mypage 링크 추가 */}
          </li>
        </ul>
      </nav>

      <Routes>
        {/* 홈 페이지 */}
        <Route path="/" element={<Home />} />
        {/* 데이터 및 투자 페이지 */}
        <Route path="/data" element={<DataDisplay />} />
        {/* 내 페이지 */}
        <Route path="/mypage" element={<MyPage />} /> {/* Mypage 경로 추가 */}
      </Routes>
    </Router>
  );
}

// 홈 컴포넌트 (간단한 소개 페이지)
function Home() {
  return (
    <div>
      <h1>AI 주식 투자 봇</h1>
      <p>이 웹 애플리케이션은 AI가 주식을 투자하고 관리해줍니다.</p>
      <p>메뉴에서 "AI 투자"를 선택하여 데이터를 확인하세요.</p>
    </div>
  );
}

export default App;
