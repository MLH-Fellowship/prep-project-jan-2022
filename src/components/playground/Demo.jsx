import React, { useEffect, useMemo, useState } from 'react';
import { Container } from '@mui/material';
import '../../App.css';
import './Demo.css';
import logo from '../../mlh-prep.png';
import {
  ForecastWrapper,
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
import PlaceholderSkeleton from '../PlaceholderSkeleton/Placeholder';
import Loader from '../Loader/Loader';
import Alerts from '../CriticalAlerts/Alert';
import ForecastCarousel from '../carousel/ForecastCarousel';
import Charts from '../Charts/Charts';
import WeatherSuggestions from '../WeatherSuggestions/Suggestions';

function Demo() {
  // eslint-disable-next-line no-unused-vars
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
          setResults(data);
          setLocation(data.location);
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
          marginBottom: '2em',
        }}
      >
        <img src={logo} alt="" className="logo" />
      </header>
      <Container maxWidth="lg">
        <SearchBarWrapper id="search-wrapper">
          <SearchBar setLocationQuery={setLocationQuery} />
        </SearchBarWrapper>
        <WeatherAndMapContainer id="map-and-current-status-container">
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
      </Container>
    </>
  );
}

export default Demo;
