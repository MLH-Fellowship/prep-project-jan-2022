import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import './Demo.css';
import logo from '../../mlh-prep.png';
import {
  ForecastWrapper,
  Main,
  MapWrapper,
  SearchBarWrapper,
  SuggestionsWrapper,
  WeatherAndMapContainer,
  WeatherCurrentWrapper,
  WeatherWarningsWrapper,
} from './Elements';
import { OpenWeatherMap } from '../../lib/OpenWeatherMap';
import SearchBar from '../SearchBar/SearchBar';
import CurrentStatus from '../CurrentStatus';
import WeatherMap from '../WeatherMap/WeatherMap';

function Demo() {
  /* eslint-disable -- @todo get rid of this later */
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState('');
  const [results, setResults] = useState(null);
  const [cityCoordinates, setCityCoordinates] = useState({
    lat: '51.505',
    lon: '-0.09',
  });

  const openWeatherMap = new OpenWeatherMap(process.env.REACT_APP_APIKEY);
  const updateState = () => {
    setIsLoaded(false);
    setResults(null);
    openWeatherMap
      .getData(city)
      .then(
        (data) => {
          // ! This section needs a refactor
          setResults(data);
          setCityCoordinates(data.location);

          // dbg
          console.log(data);
          // some setWeatherObject()
        },
        (err) => {
          setError(err);
        }
      )
      .finally(() => {
        setIsLoaded(true);
      });
  };

  // Set things in motion whenever a new `city` is set
  useEffect(updateState, [city]);

  return (
    <>
      <header style={{
      //  For now... @todo remove
        marginBottom: '2em',
      }}>
        <img src={logo} alt='' className='logo' />
      </header>
      <Container maxWidth={'lg'}>
        <Main>
          <SearchBarWrapper>
            <SearchBar
              setCity={setCity}
            />
          </SearchBarWrapper>
          <WeatherAndMapContainer>
              {/* This is broken. Need help fixing the layout for this. */}
              <WeatherCurrentWrapper>
            <div className='result-map-container'>
              {!isLoaded && <h2>Loading...</h2>}
              {isLoaded && results && (
                <CurrentStatus
                  currentWeather={results.current}
                />
              )}
            </div>
            </WeatherCurrentWrapper>
            <MapWrapper>
              <WeatherMap
                city={city}
                setCity={setCity}
                cityCoordinates={cityCoordinates}
                setCityCoordinates={setCityCoordinates}
              />
            </MapWrapper>
          </WeatherAndMapContainer>

          <WeatherWarningsWrapper>

          </WeatherWarningsWrapper>
          <ForecastWrapper>

          </ForecastWrapper>
          <SuggestionsWrapper>

          </SuggestionsWrapper>
        </Main>
      </Container>
    </>
  );
}

export default Demo;
