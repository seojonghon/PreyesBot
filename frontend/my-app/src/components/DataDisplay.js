// src/components/DataDisplay.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DataDisplay() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/data');
        setData(response.data.message);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>React Frontend</h1>
      {data ? <p>{data}</p> : <p>Loading...</p>}
    </div>
  );
}

export default DataDisplay;
