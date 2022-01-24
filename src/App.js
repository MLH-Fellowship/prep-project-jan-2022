import { useEffect, useState } from 'react';
import './App.css';
import WeatherMap from './components/WeatherMap/WeatherMap';

import cities from './assets/data/cities.json';
import Header from './components/Header';

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
      <Header
        city={city}
        setCity={setCity}
        currentSearch={currentSearch}
        cityList={cityList}
        setCurrentSearch={setCurrentSearch}
      />
      <article>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="Results main-element">
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
        </div>
        {(!isLoaded || results) && (
          <WeatherMap
            city={city}
            setCity={setCity}
            cityCoordinates={cityCoordinates}
            setCityCoordinates={setCityCoordinates}
          />
        )}
      </article>
    </>
  );
}

export default App;
