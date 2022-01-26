import WeatherCard from './WeatherCard';
import './Forecast.css';

export default function Forecast({
  forecasts = [
    {
      day: 'Today',
      date: 'Feb 22',
      iconClass: 'wi-day-sunny',
      low: '12',
      high: '33',
    },
    {
      day: 'Today',
      date: 'Feb 22',
      iconClass: 'wi-day-sunny',
      low: '12',
      high: '33',
    },
    {
      day: 'Today',
      date: 'Feb 22',
      iconClass: 'wi-day-sunny',
      low: '12',
      high: '33',
    },
    {
      day: 'Today',
      date: 'Feb 22',
      iconClass: 'wi-day-sunny',
      low: '12',
      high: '33',
    },
    {
      day: 'Today',
      date: 'Feb 22',
      iconClass: 'wi-day-sunny',
      low: '12',
      high: '33',
    },
  ],
  selectors = ['7 Days', '7 Hours'],
}) {
  return (
    <div className="forecast-container">
      <div className="selector">
        <span className="label">Showing weather for next</span>
        <select>
          {selectors.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div className="content">
        <div className="forecasts">
          {forecasts.map((forecast) => (
            <WeatherCard
              day={forecast.day}
              date={forecast.date}
              iconClass={forecast.iconClass}
              low={forecast.low}
              high={forecast.high}
              key={forecast.day}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
