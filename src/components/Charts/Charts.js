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
import Carousel from 'react-grid-carousel';

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
  const labelData = data.hourly.slice(0, 10).map(({ dt }) =>
    new Date(dt * 1000).toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute: '2-digit',
    })
  );

  const chartDataOne = {
    labels: labelData,
    datasets: [
      {
        label: 'Humidity',
        data: data.hourly.map(({ humidity }) => humidity),
        borderColor: 'rgb(53, 162, 235)',
        fill: true,
        backgroundColor: 'rgba(53, 162, 235, 0.4)',
      },
    ],
  };
  const chartDataTwo = {
    labels: labelData,
    datasets: [
      {
        label: 'Temperature',
        data: data.hourly.map(({ humidity }) => humidity),
        borderColor: 'rgb(255, 99, 132)',
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.4)',
      },
    ],
  };
  const chartDataThree = {
    labels: labelData,
    datasets: [
      {
        label: 'Pressure',
        data: weatherData.hourly.map(({ pressure }) => pressure),
        fill: true,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.4)',
      },
    ],
  };

  return (
    <div className="chart-container">
      <Carousel
        cols={1}
        rows={1}
        gap={5}
        loop={false}
        hideArrow={false}
        showDots
      >
        <Carousel.Item>
          <Line data={chartDataOne} options={options} />
        </Carousel.Item>
        <Carousel.Item>
          <Line data={chartDataTwo} options={options} />
        </Carousel.Item>
        <Carousel.Item>
          <Line data={chartDataThree} options={options} />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Charts;
