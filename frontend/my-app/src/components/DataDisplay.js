import React, { useState, useEffect } from 'react';

const DataDisplay = () => {
  const [stockData, setStockData] = useState(null);
  const [initialBalance, setInitialBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(10); // 타이머 상태 추가

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      fetch('http://localhost:5000/api/data')
        .then((response) => response.json())
        .then((data) => {
          setStockData(data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    };

    fetchData();

    // 10초마다 데이터 갱신
    const interval = setInterval(() => {
      fetchData();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // 타이머 설정
    const timerInterval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          investAutomatically(); // 타이머가 0이 되면 자동 투자 실행
          return 10; // 타이머를 10초로 리셋
        }
        return prev - 1; // 타이머 감소
      });
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  const calculateProfitPercentage = () => {
    if (!stockData || !stockData.stocks) {
      return 0;
    }

    let totalInvestment = stockData.currentBalance; // 초기 투자 금액
    let totalValue = 0;

    stockData.stocks.forEach((stock) => {
      totalValue += stock.price * stock.quantity; // 현재 가격을 사용
    });

    if (totalInvestment === 0) {
      return 0;
    }

    const profit = totalValue - totalInvestment;
    const profitPercentage = ((profit / totalInvestment) * 100).toFixed(2);
    return profitPercentage;
  };

  const investAutomatically = () => {
    if (!stockData || !stockData.stocks) return;

    // 투자 전략: 현재 가격이 이전 가격보다 낮은 주식에 대해 1주 구매
    stockData.stocks.forEach((stock) => {
      if (stock.price < stock.previousPrice && stockData.currentBalance >= stock.price) {
        fetch('http://localhost:5000/api/invest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ stockName: stock.name, quantity: 1 }), // 1주 구매
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.data) {
              setStockData(data.data); // 투자 후 갱신된 데이터를 받기
            }
          })
          .catch((error) => {
            console.error('Error during investment:', error);
            alert('투자 중 오류가 발생했습니다. 다시 시도해 주세요.');
          });
      }
    });
  };

  const handleInitialBalanceSubmit = (event) => {
    event.preventDefault();
    if (initialBalance > 0) {
      fetch('http://localhost:5000/api/setBalance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ balance: initialBalance }),
      })
        .then((response) => response.json())
        .then((data) => {
          setStockData(data.data);
        })
        .catch((error) => {
          console.error('Error setting balance:', error);
          alert('원금 설정 중 오류가 발생했습니다. 다시 시도해 주세요.');
        });
    } else {
      alert('원금을 0보다 큰 숫자로 입력해주세요.');
    }
  };

  if (loading) {
    return <div>Loading...</div>; // 로딩 중 표시
  }

  return (
    <div>
      <h1>Stock Investment Dashboard</h1>
      <div>
        <h2>원금: {stockData ? stockData.currentBalance : 0}</h2>
        <h3>수익률: {calculateProfitPercentage()}%</h3>
        <h3>다음 투자까지 남은 시간: {timer}초</h3> {/* 타이머 표시 */}
      </div>
      <div>
        <h3>투자 종목 및 갯수</h3>
        <ul>
          {stockData &&
            stockData.stocks.map((stock) => (
              <li key={stock.name}>
                {stock.name} - {stock.quantity} 주, 현재 가격: {stock.price.toFixed(2)}$
              </li>
            ))}
        </ul>
      </div>
      <div>
        <h3>원금 설정</h3>
        <form onSubmit={handleInitialBalanceSubmit}>
          <input
            type="number"
            value={initialBalance}
            onChange={(e) => setInitialBalance(e.target.value)}
            placeholder="원금을 입력하세요"
          />
          <button type="submit">원금 설정</button>
        </form>
      </div>
      <button onClick={investAutomatically}>AI 투자 실행</button>
    </div>
  );
};

export default DataDisplay;