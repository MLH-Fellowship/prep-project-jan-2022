import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import '../../App.css';
import './Demo.css';
import logo from '../../mlh-prep.png';
import {
  ForecastWrapper,
  // Main,
  MapWrapper,
  SearchBarWrapper,
  SuggestionsWrapper,
  // SuggestionsWrapper,
  WeatherAndMapContainer,
  WeatherCurrentWrapper,
  WeatherWarningsWrapper,
} from './Elements';
import { OpenWeatherMap } from '../../lib/OpenWeatherMap';
import SearchBar from '../SearchBar/SearchBar';
import CurrentStatus from '../CurrentStatus';
import WeatherMap from '../WeatherMap/WeatherMap';
import PlaceholderSkeleton from '../PlaceholderSkeleton/Placeholder';
import Loader from '../Loader/Loader';
import Alerts from '../CriticalAlerts/Alert';
import ForecastCarousel from '../carousel/ForecastCarousel';
import Charts from '../Charts/Charts';
import WeatherSuggestions from '../WeatherSuggestions/Suggestions';

function Demo() {
  /* eslint-disable -- @todo get rid of this later */
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [/** @type {string|LatLng} */ locationQuery, setLocationQuery] =
    useState('');
  const [location, setLocation] = useState(null);
  const [results, setResults] = useState(null);

  const openWeatherMap = new OpenWeatherMap(process.env.REACT_APP_APIKEY);
  const updateState = () => {
    setIsLoaded(false);
    openWeatherMap
      .getData(locationQuery)
      .then(
        (data) => {
          // ! This section needs a refactor
          setResults(data);
          setLocation(data.location);

          // dbg
          console.log('rendering', data);
          // some setWeatherObject()
        },
        (err) => {
          setError(err);
          setResults(null);
        }
      )
      .finally(() => {
        setIsLoaded(true);
      });
  };

  // Set things in motion whenever a new `city` is set
  useEffect(updateState, [locationQuery]);

  return (
    <>
      <header
        style={{
          //  For now... @todo remove
          marginBottom: '2em',
        }}
      >
        <img src={logo} alt="" className="logo" />
      </header>
      <Container maxWidth="lg">
        {/* <Main> */}
        <SearchBarWrapper id="search-wrapper">
          <SearchBar setLocationQuery={setLocationQuery} />
        </SearchBarWrapper>
        <WeatherAndMapContainer id="map-and-current-status-container">
          {/* This is broken. Need help fixing the layout for this. */}
          <WeatherCurrentWrapper id="current-status-wrapper">
            {!isLoaded && <Loader />}
            {isLoaded && !results && <PlaceholderSkeleton />}
            {isLoaded && results && (
              <CurrentStatus currentWeather={results.current} />
            )}
          </WeatherCurrentWrapper>
          <MapWrapper id="map-wrapper">
            <WeatherMap
              locationQuery={locationQuery}
              setLocationQuery={setLocationQuery}
              location={location}
            />
          </MapWrapper>
        </WeatherAndMapContainer>
        <ForecastWrapper>
          {isLoaded && results !== undefined && results !== null && (
            <ForecastCarousel
              forecastData={{ hourly: results.hourly, daily: results.daily }}
            />
          )}
        </ForecastWrapper>
        {results && <Charts data={results} />}
        <SuggestionsWrapper>
          {isLoaded && results !== undefined && results !== null && (
            <WeatherSuggestions results={results} />
          )}
        </SuggestionsWrapper>
        <WeatherWarningsWrapper>
          <Alerts alerts={results?.alerts ?? []} />
        </WeatherWarningsWrapper>
        {/* </Main> */}
      </Container>
    </>
  );
}

export default Demo;
