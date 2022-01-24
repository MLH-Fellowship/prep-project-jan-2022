import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import logo from '../assets/mlh-prep.png';
import './Header.css';

export default function Header({
  city,
  setCity,
  currentSearch,
  cityList,
  setCurrentSearch,
  className = 'header main-element',
}) {
  return (
    <header className={className}>
      <img className="logo" src={logo} alt="MLH Prep Logo" />
      <div id="weather-location-search">
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
          onSelect={(selectedCity) => setCity(selectedCity.n)}
          onSearch={(search) => setCurrentSearch(search)}
          styling={{
            borderRadius: '5px',
          }}
          inputSearchString={city ?? 'Loading Your Location...'}
        />
      </div>
    </header>
  );
}
