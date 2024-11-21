import React, { useState, useEffect } from 'react';

const StockDashboard = () => {
  const [stockData, setStockData] = useState(null);

  // 백엔드에서 데이터 가져오기
  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then((response) => response.json())
      .then((data) => setStockData(data.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // 수익률 계산
  const calculateProfitPercentage = () => {
    let totalInvestment = 0;
    let totalValue = 0;

    stockData.stocks.forEach((stock) => {
      totalInvestment += stock.price * stock.quantity;
      totalValue += stock.price * stock.quantity; // 현재 주식 가격 * 보유 주식 수
    });

    const profit = totalValue - stockData.currentBalance;
    return ((profit / totalInvestment) * 100).toFixed(2); // 수익률 % 계산
  };

  if (!stockData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Stock Investment Dashboard</h1>
      <div>
        <h2>원금: {stockData.currentBalance}</h2>
        <h2>수익률: {calculateProfitPercentage()}%</h2>
      </div>

      <h3>투자종목 및 갯수</h3>
      <ul>
        {stockData.stocks.map((stock, index) => (
          <li key={index}>
            {stock.name} - {stock.quantity} 주
          </li>
        ))}
      </ul>

      {/* AI 투자 실행 버튼 */}
      <button onClick={handleInvestment}>AI 투자 실행</button>
    </div>
  );

  function handleInvestment() {
    fetch('http://localhost:5000/api/invest', { method: 'POST' })
      .then((response) => response.json())
      .then((data) => {
        setStockData(data.data); // 투자 후 새로운 데이터 업데이트
      })
      .catch((error) => console.error('Error during investment:', error));
  }
};

export default StockDashboard;
