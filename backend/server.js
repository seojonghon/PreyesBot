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
    { name: 'AAPL', price: 150, quantity: 0 },
    { name: 'GOOGL', price: 2800, quantity: 0 },
    { name: 'AMZN', price: 3400, quantity: 0 },
  ];
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
  return res.json({ data: { currentBalance, stocks } });
});

// 투자 실행
app.post('/api/invest', (req, res) => {
  if (currentBalance <= 0) {
    return res.status(400).json({ error: 'Insufficient balance' });
  }

  stocks.forEach((stock) => {
    const investmentAmount = currentBalance / stocks.length; // 각 주식에 균등하게 투자
    const quantity = Math.floor(investmentAmount / stock.price); // 구매할 주식 수
    if (quantity > 0) {
      stock.quantity += quantity; // 주식 수량 증가
      currentBalance -= quantity * stock.price; // 원금 차감
    }
  });

  return res.json({ data: { currentBalance, stocks } });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
