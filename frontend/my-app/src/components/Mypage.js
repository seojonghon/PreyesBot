import React, { useEffect, useState } from 'react';

const Mypage = () => {
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPurchaseHistory = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/purchaseHistory');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      // 데이터 구조 확인
      if (data && Array.isArray(data.data)) {
        setPurchaseHistory(data.data);
      } else {
        console.error('Invalid data structure:', data);
      }
    } catch (error) {
      console.error('Error fetching purchase history:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchaseHistory();
  }, []);

  const renderPurchaseHistory = () => {
    return purchaseHistory.map((purchase) => (
      <tr key={purchase.id}>
        <td>{purchase.name}</td>
        <td>{purchase.price.toFixed(2)}</td>
        <td>{purchase.quantity}</td>
        <td>{purchase.totalCost.toFixed(2)}</td>
        <td>{new Date(purchase.date).toLocaleString()}</td>
      </tr>
    ));
  };

  if (loading) {
    return <div>Loading...</div>; // 로딩 중 표시
  }

  if (error) {
    return <div>Error: {error}</div>; // 오류 표시
  }

  return (
    <div>
      <h1>구매 내역</h1>
      <table id="purchase-history-table">
        <thead>
          <tr>
            <th>주식명</th>
            <th>구매 가격</th>
            <th>수량</th>
            <th>총 비용</th>
            <th>구매 날짜</th>
          </tr>
        </thead>
        <tbody>
          {renderPurchaseHistory()}
        </tbody>
      </table>
    </div>
  );
};

export default Mypage;
