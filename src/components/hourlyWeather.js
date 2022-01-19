import { useEffect, useState } from "react";

const HourlyWeather = ({ city }) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [hourlyData, setHourlyData] = useState([]);

    useEffect(() => {
        async function convertGeoLocation(city) {
            const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${process.env.REACT_APP_OPEN_CAGE_APIKEY}`).then(value => value.json());
            const cord = response["results"][0]["geometry"];
            return [cord["lat"], cord["lng"]];
        }

        async function fetchWeatherInfo(lat, lon){
            const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_APIKEY}&units=metric`).then(value=>value.json());
            return response["hourly"];
        }
    }, [city]);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        return (
            <>
                <div className="title">Hourly Forecast</div>
                {!isLoaded && <h2>Loading...</h2>}
                {isLoaded && hourlyData && hourlyData.map((temperature, hour) => {
                    return <div key={hour}>
                        <div>
                            {"+" + (hour + 1) + " hr:"}
                        </div>
                        <div>
                            {(temperature).toFixed(2) + "°C"}
                        </div>
                    </div>
                })
                }
            </>
        );
    }
}

export default HourlyWeather;