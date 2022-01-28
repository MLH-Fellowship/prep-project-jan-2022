import './WeatherCard.css';

const iconList = {
  '01d': 'wi-day-sunny',
  '01n': 'wi-night-clear',
  '02d': 'wi-day-cloudy',
  '02n': 'wi-night-alt-cloudy',
  '03d': 'wi-cloud',
  '03n': 'wi-cloud',
  '04d': 'wi-cloudy',
  '04n': 'wi-cloudy',
  '09d': 'wi-showers',
  '09n': 'wi-showers',
  '10d': 'wi-day-rain',
  '10n': 'wi-night-alt-rain',
  '11d': 'wi-thunderstorm',
  '11n': 'wi-thunderstorm',
  '13d': 'wi-snow',
  '13n': 'wi-snow',
  '50d': 'wi-day-fog',
  '50n': 'wi-night-fog',
};

export default function WeatherCard({ value, data }) {
  // const value = props.value;
  console.log('this is data: ', data);
  console.log('this is value: ', value);

  const iconClass = iconList[data.weather.icon];
  
  return (
    <>
      {value === 'Daily' && (
        <>
          <div className="container">
            <div className="time">
              <span className="day">Today</span>
              <span className="date">Feb 22</span>
            </div>
            <i className={`wi ${iconClass}`} />
            <div className="low">
              <span>
                High <b>{data.temp.max}°C</b>
              </span>
            </div>
            <div className="high">
              <span>
                Low <b>{data.temp.min}°C</b>
              </span>
            </div>
          </div>
        </>
      )}
      {value === 'Hourly' && (
        <>
          <div className="container">
            <div className="time">
              <span className="day">Today</span>
              <span className="date">Feb 22</span>
            </div>
            <i className={`wi ${iconClass}`} />
            <div className="low">
              <span className="humidity-info">
                RH <b>{data.humidity}%</b>
              </span>
            </div>
            <div className="high">
              <span className="humidity-info">
                Temp <b>{data.temp}°C</b>
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
}
