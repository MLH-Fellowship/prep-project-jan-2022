import './CurrentStatus.css';
import 'weather-icons/css/weather-icons.css';
import rain from '../assets/images/cs-bg.png';

export default function CurrentStatus({
  temp,
  feelsLike,
  weatherStatus,
  visibility,
  windSpeed,
  humidity,
}) {

  // To change background image and weather symbol based on the weather type
  let background = rain;
  let iconClass = 'wi-night-clear';

  if (weatherStatus === 'Clouds'){  
    background = rain
    iconClass = 'wi-cloudy'
  }
  else if (weatherStatus === 'Clear'){
    background = rain
    iconClass = 'wi-cloud'
  }
  else if (weatherStatus === 'Dust'){
    background = rain
    iconClass = 'wi-dust'
  }
  else if (weatherStatus === 'Fog'){
    background = rain
    iconClass = 'wi-fog'
  }
  else if (weatherStatus === 'Haze'){
    background = rain
    iconClass = 'wi-haze'
  }
  else if (weatherStatus === 'Mist'){
    background = rain
    iconClass = 'wi-windy'
  }
  else if (weatherStatus === 'Rain'){
    background = rain
    iconClass = 'wi-rain'
  }
  else if (weatherStatus === 'Shower'){
    background = rain
    iconClass = 'wi-showers'
  }
  else if (weatherStatus === 'Smoke'){
    background = rain
    iconClass = 'wi-smoke'
  }
  else if (weatherStatus === 'Snow'){
    background = rain
    iconClass = 'wi-snow'
  }
  else if (weatherStatus === 'Squall'){
    background = rain
    iconClass = 'wi-strong-wind'
  }
  else if (weatherStatus === 'Thunderstorm'){
    background = rain
    iconClass = 'wi-thunderstorm'
  }
  else if (weatherStatus === 'Tornado'){
      background = rain
      iconClass = 'wi-tornado'
  }


  
      
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
