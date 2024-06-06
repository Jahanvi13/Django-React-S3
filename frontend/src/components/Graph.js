import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const Graph = () => {
  const [data, setData] = useState({ labels: [], values: [] });
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/graphical/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    if (data.labels.length > 0 && data.values.length > 0) {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Destroy existing chart instance
      }
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.labels,
          datasets: [{
            label: 'Data',
            data: data.values,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }, [data]);

  return <canvas id="myChart" ref={chartRef} width="400" height="400"></canvas>;
};

export default Graph;
