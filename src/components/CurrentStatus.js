import './CurrentStatus.css';
import 'weather-icons/css/weather-icons.css';
import rain from '../assets/images/cs-bg.png';

export default function CurrentStatus({
  temp = '21C',
  feelsLike = '20.32',
  iconClass = 'wi-day-sunny',
  background = rain,
  weatherStatus = 'Raining',
  otherInfo = [
    { title: 'VISIBILITY', value: '2 km' },
    { title: 'AIR QUALITY', value: '24' },
    { title: 'WIND SPEED', value: '21 km/h' },
    { title: 'HUMIDITY', value: '652' },
  ],
}) {
  return (
    <div className="cs-container">
      <img className="cs-bg" src={background} alt="weather status background" />
      <div className="cs-content">
        <div className="cs-main">
          <div className="cs-basics">
            <span className="temp">{temp}</span>
            <div className="cs-info">
              <span className="weather">{weatherStatus}</span>
              <span className="feels-like">{`FEELS LIKE ${parseInt(
                feelsLike,
                10
              )}°`}</span>
              <i className={`wi  ${iconClass}`} />
            </div>
          </div>
        </div>
        <div className="cs-more">
          {otherInfo.map((info) => (
            <div className="cs-more-content" key={info.title}>
              <span className="cs-more-title">{info.title}</span>
              <span className="cs-more-value">{info.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
