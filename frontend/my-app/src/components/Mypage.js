const fetchPurchaseHistory = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/purchaseHistory');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
  
      // 데이터 구조 확인
      if (data && Array.isArray(data.data)) {
        displayPurchaseHistory(data.data);
      } else {
        console.error('Invalid data structure:', data);
      }
    } catch (error) {
      console.error('Error fetching purchase history:', error);
    }
  };
  
  
  const displayPurchaseHistory = (history) => {
    const table = document.getElementById('purchase-history-table');
    table.innerHTML = ''; // 기존 내용 초기화
  
    // 테이블 헤더 추가
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
      <th>주식명</th>
      <th>구매 가격</th>
      <th>수량</th>
      <th>총 비용</th>
      <th>구매 날짜</th>
    `;
    table.appendChild(headerRow);
  
    // 구매 내역 추가
    history.forEach(purchase => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${purchase.name}</td>
        <td>${purchase.price.toFixed(2)}</td>
        <td>${purchase.quantity}</td>
        <td>${purchase.totalCost.toFixed(2)}</td>
        <td>${new Date(purchase.date).toLocaleString()}</td>
      `;
      table.appendChild(row);
    });
  };
  
  // 페이지 로드 시 구매 내역 가져오기
  window.onload = fetchPurchaseHistory;
  