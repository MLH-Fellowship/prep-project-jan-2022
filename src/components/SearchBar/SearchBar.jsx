import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { MyLocationRounded } from '@mui/icons-material';
import { useState } from 'react';
import './SearchBar.css';
import cities from './assets/cities.json';

// We need this transformation because ReactSearchAutocomplete only accepts object lists
const cityList = (() => {
  const objectList = [];
  cities.forEach((city) => {
    objectList.push({ n: city });
  });

  return objectList;
})();

export default function SearchBar({ setLocationQuery, autoFocus = true }) {
  const [currentSearch, setSearch] = useState(null);

  return (
    <div id="search-and-location-pin-container">
      <div id="search-bar-container">
        <ReactSearchAutocomplete
          items={[
            {
              n: currentSearch,
            },
            ...cityList,
          ]}
          fuseOptions={{
            keys: ['n'],
          }}
          resultStringKeyName="n"
          onSelect={(selection) => setLocationQuery(selection.n)}
          onSearch={(search) => setSearch(search)}
          styling={{
            borderRadius: '5px',
          }}
          autoFocus={autoFocus}
          inputDebounce={500}
        />
      </div>
      <MyLocationRounded
        className="fetchLocationBtn"
        font="inherit"
        style={{
          fontSize: '2em',
        }}
        onClick={() => {
          navigator.geolocation.getCurrentPosition((position) => {
            const { lat, lon } = position.coords;
            /**
             * ! Need the logic to accommodate this behavior, but it should
             * work perfectly since {@see OpenWeatherMap::getData()} supports
             * {lat, lon}.
             */
            setLocationQuery({ lat, lon });
          });
        }}
      />
      ;
    </div>
  );
}
