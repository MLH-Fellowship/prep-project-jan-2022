import React, { useState, useEffect } from 'react';
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
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import useIsMounted from '../../hooks/useIsMounted';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
// const labels = ['temp', 'pressure', 'humidity'];

// export const Bdata = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: labels.map(() => number({ min: 0, max: 1000 })),
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Dataset 2',
//       data: labels.map(() => number({ min: 0, max: 1000 })),
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };

function Charts() {
  const [chartData, setChartData] = useState({});
  const isMounted = useIsMounted();
  const fetchData = async () => {
    try {
      const res = await fetch(
        'https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&appid=150ced7b197627bc73e83666c6875778'
      ); // https://api.coincap.io/v2/assets/?limit=5
      const data = await res.json();
      console.log("console 1 =",data);
      setChartData({
        labels: data.daily.map(({dt})=> new Date(dt).toLocaleString()),
        datasets: [
          {
            label: 'Pressure',
            data: data.daily.map(({ pressure }) => pressure),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: [
              // '#ffbb11',
              '#ecf0f1',
              // '#50AF95',
              // '#f3ba2f',
              // '#2a71d0',
            ],
          },
          {
            label: 'Humidity',
            data: data.daily.map(({ humidity }) => humidity),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: [
            //   '#ffbb11',
            //   '#ecf0f1',
              '#50AF95',
              // '#f3ba2f',
            //   '#2a71d0',
            ],
          },
          {
            label: 'Temperature',
            data: data.daily.map(({ humidity }) => humidity),
            borderColor: 'rgb(53, 262, 135)',
            backgroundColor: [
              '#ffbb11',
              // '#ecf0f1',
              // '#50AF95',
              // '#f3ba2f',
              // '#2a7100',
            ],
          },
        ],
      });
    } catch (e) {
      console.log('==> ', e);
    }
  };

  useEffect(() => {
    // if (isMounted.current) {
    fetchData();
    // }
  }, []);
  console.log("console 3=",chartData);
  return (
    <div backgroundColor='yellow'>
      { chartData && <>
      <h1>{chartData.labels[1]}</h1> 
      <Bar data={chartData} options={{responsive:true}}/>
      <Line data={chartData} options={{responsive:true}} />
      </>}
      <h1>Chart</h1>

    </div>
  );
}

export default Charts;
