import './WeatherCard.css';

export default function WeatherCard(
  { value },
  {
    day = 'Today',
    date = 'Feb 22',
    iconClass = 'wi-day-sunny',
    low = '12',
    high = '33',
  }
) {
  // const value = props.value;

  return (
    <>
      {value === '7 Days' && (
        <>
          <div className="container">
            <div className="time">
              <span className="day">{day}</span>
              <span className="date">{date}</span>
            </div>
            <i className={`wi  ${iconClass}`} />
            <div className="low">
              <span>
                High <b>{high}°C</b>
              </span>
            </div>
            <div className="high">
              <span>
                Low <b>{low}°C</b>
              </span>
            </div>
          </div>
        </>
      )}
      {value === '7 Hours' && (
        <>
          <div className="container">
            <div className="time">
              <span className="day">{day}</span>
              <span className="date">{date}</span>
            </div>
            <i className={`wi  ${iconClass}`} />
            <div className="low">
              <span className="humidity-info">
                Humidity <b>{high}°</b>
              </span>
            </div>
            <div className="high">
              <span>
                Temp <b>{low}°C</b>
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
}
