import { useEffect, useState } from "react";
import './App.css';
import logo from './mlh-prep.png'

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York City")
  const [results, setResults] = useState(null);

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.REACT_APP_APIKEY}`)
      .then(res => res.json())
      .then(
        (result) => {
          if (result['cod'] !== "200") {
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
          onChange={event => setCity(event.target.value)} />
        <div className="Results">
          {!isLoaded && <h2>Loading...</h2>}
          {isLoaded && results && results.list && <>
            <h3>{results.list[0].weather[0].main}</h3>
            <p>Feels like {results.list[0].main.feels_like}°C</p>
            <i><p>{results.city.name}, {results.city.country}</p></i>
            <div>
              {results.list.filter(item => item.dt_txt.slice(11) === "09:00:00").map(item => (
                <div className="Results">
                <h3>Date: {item.dt_txt.slice(10)} Feels like {item.main.feels_like}</h3>
                </div>
              ))}
            </div>
          </>}
        </div>
      </div>
    </>
  }
}

export default App;
