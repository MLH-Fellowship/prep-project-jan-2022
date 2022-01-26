import React from 'react';
import styled from '@emotion/styled';

function Demo() {
  const Main = styled.main`
    /** @todo: Get rid of the min height later */
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 0.2fr 1.2fr 1fr 1.5fr 1fr;
    grid-auto-rows: 1fr;
    gap: 2% 2%;
    grid-auto-flow: row;
    grid-template-areas:
      'search-bar search-bar search-bar search-bar search-bar'
      'current-weather current-weather current-weather map map'
      'weather-warnings weather-warnings weather-warnings weather-warnings weather-warnings'
      'weather-forecast weather-forecast weather-forecast weather-forecast weather-forecast'
      'weather-suggestions weather-suggestions weather-suggestions weather-suggestions weather-suggestions';

    & * {
      border: 1px solid red;
      position: relative;
    }

    /* @remove Content placeholders -- remove once we have things in place */
    & *:after {
      content: attr(class);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: grid;
      align-items: center;
      justify-content: center;
    }
  `;
  const SearchBarWrapper = styled.div`
    grid-area: search-bar;
  `;
  const WeatherCurrentWrapper = styled.div`
    grid-area: current-weather;
  `;
  const MapWrapper = styled.div`
    grid-area: map;
  `;
  const WeatherWarningsWrapper = styled.div`
    grid-area: weather-warnings;
  `;
  const ForecastWrapper = styled.div`
    grid-area: weather-forecast;
  `;
  const SuggestionsWrapper = styled.div`
    grid-area: weather-suggestions;
  `;

  /* eslint-disable -- @todo get rid of this later */
  return (
    <>
      <Main>
        <SearchBarWrapper>

        </SearchBarWrapper>
        <WeatherCurrentWrapper>

        </WeatherCurrentWrapper>
        <MapWrapper>

        </MapWrapper>
        <WeatherWarningsWrapper>

        </WeatherWarningsWrapper>
        <ForecastWrapper>

        </ForecastWrapper>
        <SuggestionsWrapper>

        </SuggestionsWrapper>
      </Main>
    </>
  );
}

export default Demo;
