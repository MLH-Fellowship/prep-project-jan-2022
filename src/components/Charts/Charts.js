import React, { useEffect, useState } from 'react';
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
import axios from 'axios';

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
      text: 'Predicted Data',
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
  const [airQualityData, setAirQualityData] = useState([]);
  const  [tempData,setTempData] = useState([]);
  const [humiditydata, sethumiditydata] = useState([]);

  
  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/air_pred')
      .then((res) => {
        console.log(res);
        const data3 = res.data[0].air_quality;
        const data2 = res.data[0].humidity;
        const data1 = res.data[0].temperature;
        console.log(data, 'Data');
        setAirQualityData(data3);
        sethumiditydata(data2);
        setTempData(data1);
        console.log(airQualityData, "airQualityData");
      })
      .catch((err) => console.log(err));

    // const fetchdata = async () => {
    //   const response = await axios.get('http://127.0.0.1:5000/air_pred');
    //   console.log(await response.data?.air_quality);
    //   console.log(response);
    //   setAirQualityData([...response.data?.air_quality]);
    // };

    // fetchdata();
  }, []);

  const labelData = [
    'Day 1',
    'Day 2',
    'Day 3',
    'Day 4',
    'Day 5',
    'Day 6',
    'Day 7',
    'Day 8',
    'Day 9',
    'Day 10',
  ];

  const chartDataOne = {
    labels: labelData,
    datasets: [
      {
        label: 'Humidity',
        data: humiditydata ? humiditydata.map((data) => data) : [],
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
        data: tempData ? tempData.map((data) => data) : [],
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
        label: 'Air Quality',
        data: airQualityData ? airQualityData.map((data) => data) : [],
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
