import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const history = useHistory();

  const goToMyPage = () => {
    history.push('/mypage'); // Mypage.js로 이동
  };

  return (
    <div>
      <h1>홈페이지</h1>
      <button onClick={goToMyPage}>내 페이지로 가기</button>
      {/* 다른 컴포넌트나 내용 추가 */}
    </div>
  );
};

export default Home;
