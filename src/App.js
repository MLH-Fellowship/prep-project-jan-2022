import { useEffect, useState } from 'react';
import './App.css';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import logo from './mlh-prep.png';
import WeatherMap from './components/WeatherMap/WeatherMap';

import cities from './assets/data/cities.json';

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
  const [city, setCity] = useState('New York City');
  const [results, setResults] = useState(null);
  const [cityCoordinates, setCityCoordinates] = useState({
    lat: '51.505',
    lon: '-0.09',
  });

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_APIKEY}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.cod !== 200) {
            setIsLoaded(false);
          } else {
            setIsLoaded(true);
            setResults(result);
            setCity(result.name);
            setCityCoordinates({
              lat: result.coord.lat,
              lon: result.coord.lon,
            });
          }
        },
        (err) => {
          setIsLoaded(true);
          setError(err);
        }
      );
  }, [city]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      <img className="logo" src={logo} alt="MLH Prep Logo" />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h2>Enter a city below 👇</h2>
        <div id="weather-location-search">
          <ReactSearchAutocomplete
            items={cityList}
            fuseOptions={{
              keys: ['n'],
            }}
            resultStringKeyName="n"
            onSelect={(selectedCity) => setCity(selectedCity.n)}
            styling={{
              borderRadius: '5px',
            }}
          />
        </div>
        <div className="Results">
          {!isLoaded && <h2>Loading...</h2>}
          {console.log(results)}
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
        </div>
      </div>
      <div className="weather-map">
        <WeatherMap
          city={city}
          setCity={setCity}
          cityCoordinates={cityCoordinates}
          setCityCoordinates={setCityCoordinates}
        />
      </div>
    </>
  );
}

export default App;
