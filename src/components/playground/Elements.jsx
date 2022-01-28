import styled from '@emotion/styled';

export const Main = styled.main`
  /** @todo: Get rid of the min height later */
  min-height: 100vh;

  & > *,
  & > * > * {
    ${
      '' /* border: 1px solid red;
    position: relative; */
    }
  }
`;
export const SearchBarWrapper = styled.div`
  height: 2em;
`;
export const WeatherAndMapContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 14px;
  margin: 40px auto;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;
export const WeatherCurrentWrapper = styled.div`
  height: 100%;
  width: 100%;
`;
export const MapWrapper = styled.div`
  width: 100%;
  position: relative;
  top: 10px;

  .leaflet-container {
    contain: paint;
    height: 275px;
  }

  .map {
    border-radius: 10px;
  }
`;
export const WeatherWarningsWrapper = styled.div`
  /**@todo remove this static height when placing the component */
  height: fit-content;
  margin-top: 1em;
`;
export const ForecastWrapper = styled.div`
  height: fit-content;
`;
export const SuggestionsWrapper = styled.div`
  height: fit-content;
`;
