import { useEffect, useState } from 'react';
import './Demo.css';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import WeatherMap from '../WeatherMap/WeatherMap';
import WeatherAlerts from '../WeatherAlerts/WeatherAlerts';
import cities from '../../assets/data/cities.json';
import CurrentStatus from '../CurrentStatus';
import Alert from '../Alert';
import Forecast from '../Forecast';

// We need this transformation because ReactSearchAutocomplete only accepts object lists
const cityList = (() => {
  const objectList = [];
  cities.forEach((city) => {
    objectList.push({ n: city });
  });

  return objectList;
})();

function Demo() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState(null);
  const [results, setResults] = useState(null);
  const [cityCoordinates, setCityCoordinates] = useState({
    lat: '51.505',
    lon: '-0.09',
  });

  const [currentSearch, setCurrentSearch] = useState('');
  const [Weatherobject, setWeatherobject] = useState({
    weather: null,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_APIKEY}`
        )
          .then((res) => res.json())
          .then((result) => {
            setIsLoaded(true);
            setResults(result);
            setCity(`${result.name}, ${result.sys.country}`);
            setCityCoordinates({
              lat: result.coord.lat,
              lon: result.coord.lon,
            });
            setWeatherobject({
              weather: result.weather[0],
              stats: result.main,
            });
          })
          .catch((err) => {
            setIsLoaded(true);
            setError(err);
          });
      },
      () => {
        setCity('');
      }
    );
  }, []);

  useEffect(() => {
    setResults(null);
    setIsLoaded(false);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_APIKEY}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.cod === 200) {
            setResults(result);
            setCity(`${result.name}, ${result.sys.country}`);
            setCityCoordinates({
              lat: result.coord.lat,
              lon: result.coord.lon,
            });
            setWeatherobject({
              weather: result.weather[0],
              stats: result.main,
            });
          } else {
            setResults(null);
          }
        },
        (err) => {
          setError(err);
        }
      )
      .finally(() => {
        setIsLoaded(true);
      });
  }, [city]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="page-container">
      <img className="logo" src="/mlh-prep.png" alt="MLH Prep Logo" />
      <div className="weather-location-search">
        <ReactSearchAutocomplete
          items={[
            {
              n: currentSearch,
            },
            ...cityList,
          ]}
          fuseOptions={{
            keys: ['n'],
          }}
          resultStringKeyName="n"
          onSelect={(selectedCity) => setCity(selectedCity.n)}
          onSearch={(search) => setCurrentSearch(search)}
          styling={{
            borderRadius: '5px',
          }}
          inputSearchString={city ?? 'Loading Your Location...'}
        />
      </div>
      <div className="result-map-container">
        {!isLoaded && <h2>Loading...</h2>}
        {isLoaded && results && (
          <CurrentStatus
            weatherStatus={results.weather[0].main}
            feelsLike={results.main.feels_like}
          />
        )}
        {isLoaded && !results && <h2>No Results Found</h2>}
        <div className="weather-map">
          {(!isLoaded || results) && (
            <WeatherMap
              city={city}
              setCity={setCity}
              cityCoordinates={cityCoordinates}
              setCityCoordinates={setCityCoordinates}
            />
          )}
        </div>
      </div>
      <Alert />
      <div className="weather-alerts">
        {isLoaded && results && Weatherobject.weather !== null && (
          <WeatherAlerts weather={Weatherobject.weather} />
        )}
      </div>
      <Forecast />
    </div>
  );
}

export default Demo;
