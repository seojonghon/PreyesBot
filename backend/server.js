// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let currentBalance = 0;
let stocks = [];

// 초기 데이터 설정
const initializeStocks = () => {
  stocks = [
    { name: 'AAPL', price: 150, quantity: 0, previousPrice: 150 },
    { name: 'GOOGL', price: 2800, quantity: 0, previousPrice: 2800 },
    { name: 'AMZN', price: 3400, quantity: 0, previousPrice: 3400 },
  ];
};

// 주식 가격을 랜덤하게 변경하는 함수
const updateStockPrices = () => {
  stocks.forEach(stock => {
    stock.previousPrice = stock.price; // 이전 가격 저장
    const priceChange = (Math.random() * 0.1 - 0.05) * stock.price; // -5%에서 +5% 사이의 변동
    stock.price = Math.max(1, stock.price + priceChange); // 가격이 1 이하로 떨어지지 않도록
  });
};

// 10초마다 주식 가격 업데이트 및 1주씩 구매
setInterval(() => {
  updateStockPrices(); // 주식 가격 업데이트
  investInStocks(); // 1주씩 투자
}, 10000);

// 1주씩 투자하는 함수
const investInStocks = () => {
  if (currentBalance <= 0) return;

  // 현재 가격이 이전 가격보다 낮은 주식 필터링
  const affordableStocks = stocks.filter(stock => stock.price < stock.previousPrice);

  // 조건에 맞는 주식이 있을 경우, 하나만 구매
  if (affordableStocks.length > 0) {
    const stockToBuy = affordableStocks[0]; // 첫 번째 주식 선택
    const quantity = 1; // 1주 구매
    const totalCost = quantity * stockToBuy.price;

    if (currentBalance >= totalCost) {
      stockToBuy.quantity += quantity; // 주식 수량 증가
      currentBalance -= totalCost; // 원금 차감
    }
  }
};

// 원금 설정
app.post('/api/setBalance', (req, res) => {
  const { balance } = req.body;
  if (balance > 0) {
    currentBalance = balance;
    initializeStocks(); // 주식 초기화
    return res.json({ data: { currentBalance, stocks } });
  }
  return res.status(400).json({ error: 'Invalid balance' });
});

// 데이터 조회
app.get('/api/data', (req, res) => {
  const totalValue = stocks.reduce((acc, stock) => acc + (stock.price * stock.quantity), 0);
  const profitLoss = totalValue - currentBalance;
  const returnRate = currentBalance > 0 ? (profitLoss / currentBalance) * 100 : 0; // 수익률 계산

  return res.json({ 
    data: { 
      currentBalance, 
      stocks, 
      returnRate: returnRate.toFixed(2) + '%' // 소수점 2자리로 포맷
    } 
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
