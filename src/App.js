import { useEffect, useState } from "react";
import './App.css';
import logo from './mlh-prep.png'

import { cities } from "./assets/data/cities.json"

async function getAutoCompleteSuggestions(name) {
  return []
}

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York City")
  const [results, setResults] = useState(null);
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_APIKEY}`)
      .then(res => res.json())
      .then(
        (result) => {
          if (result['cod'] !== 200) {
            setIsLoaded(false)
          } else {
            setIsLoaded(true);
            setResults(result);
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
    getAutoCompleteSuggestions(city).then((_suggestions) => {
      setSuggestions(_suggestions)
    })
  }, [city])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return <>
      <img className="logo" src={logo} alt="MLH Prep Logo"></img>
      <div>
        <h2>Enter a city below 👇</h2>
        <input
          type="text"
          value={city}
          className="autocomplete-input"
          onChange={event => setCity(event.target.value)} />
        <div className="autocomplete-list">
          {
            (suggestions.length > 0) && (
              <p>Suggestions:</p>
            )
          }
          {
            suggestions.map(suggestion => {
              return (
                <div className="autocomplete-item" onClick={() => setCity(suggestion)}>{suggestion}</div>
              )
            })
          }
        </div>
        <div className="Results">
          {!isLoaded && <h2>Loading...</h2>}
          {console.log(results)}
          {isLoaded && results && <>
            <h3>{results.weather[0].main}</h3>
            <p>Feels like {results.main.feels_like}°C</p>
            <i><p>{results.name}, {results.sys.country}</p></i>
          </>}
        </div>
      </div>
    </>
  }
}

export default App;
