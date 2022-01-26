import { useState } from "react";

// temporary -- please remove
/* eslint-disable */

const dummyData = [
    {
      humidity: 200,
      temp: 20,
      pressure: 400,
    },
    {
      humidity: 200,
      temp: 20,
      pressure: 400,
    },
  ];

function HourlyWeather(data) {
  if (!data instanceof Array) {
    data = dummyData;
  }

  const [hourlyData, setHourlyData] = useState(dummyData);

  return (
    <>
      <div className="title">Hourly Forecast</div>
      {"This is what's up: " + typeof hourlyData}
      {console.log('"hourlyData" is' +  JSON.stringify(hourlyData))}
      {hourlyData && hourlyData.map((data) => {
        return (
          <div>
            <div>{/* {"+" + (hour + 1) + " hr:"} */}</div>
            <div>temp: {data["temp"].toFixed(2) + "°C"}</div>
            <div>humidity: {data["humidity"]}</div>
          </div>
        );
      })}

    </>
  );
}

export default HourlyWeather;
