import styled from '@emotion/styled';

export const Main = styled.main`
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
export const SearchBarWrapper = styled.div`
  height: 2em;
`;
export const WeatherAndMapContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  & > * {
    margin: 1em 0;
  }
`;
export const WeatherCurrentWrapper = styled.div`
  height: 469px;
  width: 100%;
  min-width: 300px;
  flex: 2;
`;
export const MapWrapper = styled.div`
  height: 469px;
  width: 100%;
  min-width: 300px;
  flex: 1;
`;
export const WeatherWarningsWrapper = styled.div`
  /**@todo remove this static height when placing the component */
  height: 400px;
`;
export const ForecastWrapper = styled.div`
  height: 400px;
`;
export const SuggestionsWrapper = styled.div`
  height: 371px;
`;
