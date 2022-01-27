import './CurrentStatus.css';
import 'weather-icons/css/weather-icons.css';
import rain from '../assets/images/cs-bg.png';

export default function CurrentStatus({
  temp,
  feelsLike,
  iconClass = 'wi-day-sunny',
  background = rain,
  weatherStatus,
  visibility,
  windSpeed,
  humidity,
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
          <div className="cs-more-content">
            <span className="cs-more-title"> VISIBILITY </span>
            <span className="cs-more-value"> {visibility} </span>
          </div>
          <div className="cs-more-content">
            <span className="cs-more-title"> AIR QUALITY </span>
            <span className="cs-more-value"> N.A. </span>
          </div>
          <div className="cs-more-content">
            <span className="cs-more-title"> WIND SPEED </span>
            <span className="cs-more-value"> {windSpeed} </span>
          </div>
          <div className="cs-more-content">
            <span className="cs-more-title"> HUMIDITY </span>
            <span className="cs-more-value"> {humidity} </span>
          </div>
        </div>
      </div>
    </div>
  );
}
