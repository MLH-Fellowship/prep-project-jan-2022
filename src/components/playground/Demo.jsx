import React from 'react';
import styled from '@emotion/styled';
import { Container } from '@mui/material';

function Demo() {
  const Main = styled.main`
    /** @todo: Get rid of the min height later */
    min-height: 100vh;
    display: grid;
    grid-auto-rows: max-content;
    gap: 2% 2%;
    grid-auto-flow: row;

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
    //grid-area: search-bar;
    height: 2em;
  `;
  const WeatherAndMapContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  `;
  const WeatherCurrentWrapper = styled.div`
    //grid-area: current-weather;
    height: 469px;
    width: 100%;
    min-width: 300px;
    flex: 2;
  `;
  const MapWrapper = styled.div`
    //grid-area: map;
    height: 469px;
    width: 100%;
    min-width: 300px;
    flex: 1;
  `;
  const WeatherWarningsWrapper = styled.div`
    //grid-area: weather-warnings;
    /**@todo remove this static height when placing the component */
    height: 400px;
  `;
  const ForecastWrapper = styled.div`
    //grid-area: weather-forecast;
    height: 400px;
  `;
  const SuggestionsWrapper = styled.div`
    //grid-area: weather-suggestions;
    height: 371px;
  `;

  /* eslint-disable -- @todo get rid of this later */
  return (
    <>
      <Container maxWidth={'md'}>
        <Main>
          <SearchBarWrapper>

          </SearchBarWrapper>
          <WeatherAndMapContainer>
            <WeatherCurrentWrapper>

            </WeatherCurrentWrapper>
            <MapWrapper>

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
