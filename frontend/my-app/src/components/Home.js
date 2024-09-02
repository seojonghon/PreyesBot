// src/components/Home.js
import React from 'react';
import '../css/Home.css'; // 필요시 추가
import stockImage from '../assets/home-image.jpg'; // 이미지 import

function Home() {
  return (
    <div className="container">
      <h1>PREYES</h1>
      <img src={stockImage} alt="주식 예측" className="home-image" />
      <p>우리의 AI 봇은 최신 데이터를 기반으로 주식 시장을 분석하고 예측합니다.</p>
      <p>지금 바로 시작해보세요!</p>
    </div>
  );
}

export default Home;
