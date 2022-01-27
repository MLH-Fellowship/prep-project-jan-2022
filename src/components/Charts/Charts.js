import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import weatherData from './chartData.json';
import './chart.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Hourly Data',
    },

    chartAreaBorder: {
      borderColor: 'red',
      borderWidth: 2,
      borderDash: [5, 5],
      borderDashOffset: 2,
    },
  },
};

function Charts({ data }) {
  const chartData = {
    labels: data.hourly.slice(0, 10).map(({ dt }) =>
      new Date(dt * 1000).toLocaleTimeString(navigator.language, {
        hour: '2-digit',
        minute: '2-digit',
      })
    ),
    datasets: [
      {
        label: 'Pressure',
        data: weatherData.hourly.map(({ pressure }) => pressure),
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'Humidity',
        data: data.hourly.map(({ humidity }) => humidity),
        borderColor: 'rgb(53, 162, 235)',
        fill: true,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Temperature',
        data: data.hourly.map(({ humidity }) => humidity),
        borderColor: 'rgb(53, 262, 135)',
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div className="chart-container">
      {chartData && (
        <>
          <Line data={chartData} options={options} />
        </>
      )}
      <h1>Chart</h1>
    </div>
  );
}

export default Charts;
