import { useEffect, useState } from "react";
import './App.css';
import logo from './mlh-prep.png'

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState(null)
  const [results, setResults] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_APIKEY}`)
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setResults(result);
              setCity(`${result.name}, ${result.sys.country}`);
            }
          )
          .catch(
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
      }, () => {
        setCity("");
      })
  }, [])

  useEffect(() => {
    setResults(null);
    setIsLoaded(false);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_APIKEY}`)
      .then(res => res.json())
      .then(
        (result) => {
          if (result['cod'] === 200) {
            setResults(result);
          } else {
            setResults(null);
          }
        },
        (error) => {
          setError(error);
        }
      ).finally(() => {
        setIsLoaded(true);
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
          value={city ?? "Loading Your Location..."}
          onChange={event => setCity(event.target.value)} />
        <div className="Results">
          {!isLoaded && <h2>Loading...</h2>}
          {isLoaded && results && <>
            <h3>{results.weather[0].main}</h3>
            <p>Feels like {results.main.feels_like}°C</p>
            <i><p>{results.name}, {results.sys.country}</p></i>
          </>}
          {
            isLoaded && !results && <h2>No Results Found</h2>
          }
        </div>
      </div>
    </>
  }
}

export default App;
