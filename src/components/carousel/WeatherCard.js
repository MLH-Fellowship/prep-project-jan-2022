import './WeatherCard.css';

export default function WeatherCard({
  day = 'Today',
  date = 'Feb 22',
  iconClass = 'wi-day-sunny',
  low = '12',
  high = '33',
}) {
  return (
    <div className="container">
      <div className="time">
        <span className="day">{day}</span>
        <span className="date">{date}</span>
      </div>
      <i className={`wi  ${iconClass}`} />
      <div className="low">
        <span>
          High <b>{high}°</b>
        </span>
      </div>
      <div className="high">
        <span>
          Low <b>{low}°</b>
        </span>
      </div>
    </div>
  );
}
