import { useEffect, useState } from 'react';
import './App.css';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import logo from './mlh-prep.png';
import WeatherMap from './components/WeatherMap/WeatherMap';
import WeatherAlerts from './components/WeatherAlerts/WeatherAlerts';
import cities from './assets/data/cities.json';
import Alert from './components/Alert';
import CurrentStatus from './components/CurrentStatus';

import WeatherSounds from './components/WeatherSounds/WeatherSounds';

// We need this transformation because ReactSearchAutocomplete only accepts object lists
const cityList = (() => {
  const objectList = [];
  cities.forEach((city) => {
    objectList.push({ n: city });
  });

  return objectList;
})();

function App() {
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
    <>
      <CurrentStatus />
      <Alert />
      <img className="logo" src={logo} alt="MLH Prep Logo" />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h2>Enter a city below 👇</h2>
        <div id="weather-location-search">
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
        <div className="Results">
          {!isLoaded && <h2>Loading...</h2>}
          {isLoaded && results && (
            <>
              <h3>{results.weather[0].main}</h3>
              <p>Feels like {results.main.feels_like}°C</p>
              <i>
                <p>
                  {results.name}, {results.sys.country}
                </p>
              </i>
            </>
          )}
          {isLoaded && !results && <h2>No Results Found</h2>}
        </div>
        <WeatherSounds weatherName={results?.weather[0].main} />
      </div>
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
      <div className="weather-alerts">
        {isLoaded && results && Weatherobject.weather !== null && (
          <WeatherAlerts weather={Weatherobject.weather} />
        )}
      </div>
    </>
  );
}

export default App;
