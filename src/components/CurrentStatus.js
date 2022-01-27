import './CurrentStatus.css';
import 'weather-icons/css/weather-icons.css';
import rain from '../assets/images/cs-bg.png';
import clouds from '../assets/images/clouds.png';
import clear from '../assets/images/clear.jpg';
import fog from '../assets/images/fog.jpg';
import thunderstorm from '../assets/images/thunderstorm.png';
import drizzle from '../assets/images/drizzle.jpg';
import dust from '../assets/images/dust.jpg';
import snow from '../assets/images/snow.jpg';
import shower from '../assets/images/shower.jpg';
import mist from '../assets/images/mist.jpeg';
import smoke from '../assets/images/smoke.jpg';
import sunny from '../assets/images/sunny.jpg';

const KelvinToCelsius = (k) => (k - 273.15).toFixed(3);

export default function CurrentStatus({ currentWeather }) {
  // We should still return a skeleton or something
  if (!currentWeather) {
    return <div />;
  }

  const {
    temp: tempK = '21C',
    feels_like: feelsLikeK = '20.32',
    humidity,
    visibility,
    wind_speed: windSpeed,
    // Is this supposed to be a dummy? (API doesn't offer this metric)
    airQuality = '24',
    weather,
  } = currentWeather;

  const temp = KelvinToCelsius(tempK);
  const feelsLike = KelvinToCelsius(feelsLikeK);

  const weatherStatus = weather?.[0].main;

  const otherInfo = [
    { title: 'Visibility', value: visibility },
    { title: 'Air Quality', value: airQuality },
    { title: 'Wind Speed', value: windSpeed },
    { title: 'Humidity', value: humidity },
  ];

  let iconClass = 'wi-night-clear';
  let background = rain;

  if (weatherStatus === 'Clouds') {
    background = clouds;
    iconClass = 'wi-cloudy';
  } else if (weatherStatus === 'Clear') {
    background = clear;
    iconClass = 'wi-cloud';
  } else if (weatherStatus === 'Drizzle') {
    background = drizzle;
    iconClass = 'wi-rain';
  } else if (weatherStatus === 'Dust') {
    background = dust;
    iconClass = 'wi-dust';
  } else if (weatherStatus === 'Fog') {
    background = fog;
    iconClass = 'wi-fog';
  } else if (weatherStatus === 'Haze') {
    background = rain;
    iconClass = 'wi-haze';
  } else if (weatherStatus === 'Mist') {
    background = mist;
    iconClass = 'wi-windy';
  } else if (weatherStatus === 'Rain') {
    background = rain;
    iconClass = 'wi-rain';
  } else if (weatherStatus === 'Shower') {
    background = shower;
    iconClass = 'wi-showers';
  } else if (weatherStatus === 'Smoke') {
    background = smoke;
    iconClass = 'wi-smoke';
  } else if (weatherStatus === 'Snow') {
    background = snow;
    iconClass = 'wi-snow';
  } else if (weatherStatus === 'Sunny') {
    background = sunny;
    iconClass = 'wi-day-sunny';
  } else if (weatherStatus === 'Squall') {
    background = rain;
    iconClass = 'wi-strong-wind';
  } else if (weatherStatus === 'Thunderstorm') {
    background = thunderstorm;
    iconClass = 'wi-thunderstorm';
  } else if (weatherStatus === 'Tornado') {
    background = rain;
    iconClass = 'wi-tornado';
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
