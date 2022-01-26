import React from 'react';
import { Container } from '@mui/material';

import logo from '../../mlh-prep.png';
import {
  ForecastWrapper,
  Main,
  MapWrapper,
  SearchBarWrapper, SuggestionsWrapper,
  WeatherAndMapContainer, WeatherCurrentWrapper,
  WeatherWarningsWrapper,
} from './Elements';

function Demo() {
  /* eslint-disable -- @todo get rid of this later */
  return (
    <>
      <header style={{
      //  For now... @todo remove
        marginBottom: '2em',
      }}>
        <img src={logo} alt='' className='logo' />
      </header>
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
