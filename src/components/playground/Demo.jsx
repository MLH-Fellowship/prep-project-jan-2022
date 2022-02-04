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
import IpApi from '../../lib/IpApi/IpApi.mjs';

function Demo() {
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [/** @type {string|LatLng} */ locationQuery, setLocationQuery] =
    useState('');
  const [location, setLocation] = useState(null);
  const [results, setResults] = useState(null);

  const openWeatherMap = useMemo(
    () => new OpenWeatherMap(process.env.REACT_APP_APIKEY),
    []
  );

  // Initialise by setting location to an approximate obtained through the user's IP address
  const initState = () => {
    setIsLoaded(false);
    new IpApi()
      .query()
      .then((res) => {
        setLocationQuery({ lat: res.latitude, lon: res.longitude });
      })
      .catch(() => {
        setResults(null);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  };

  // Initialise app state
  useEffect(initState, []);

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
  useEffect(updateState, [locationQuery, openWeatherMap]);

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
          {results !== null && (
            <ForecastCarousel
              forecastData={{ hourly: results.hourly, daily: results.daily }}
            />
          )}
        </ForecastWrapper>
        {results && <Charts data={results} />}
        <SuggestionsWrapper>
          {results && <WeatherSuggestions results={results.current} />}
        </SuggestionsWrapper>
        <WeatherWarningsWrapper>
          <Alerts alerts={results?.alerts ?? []} />
        </WeatherWarningsWrapper>
      </Container>
    </>
  );
}

export default Demo;
