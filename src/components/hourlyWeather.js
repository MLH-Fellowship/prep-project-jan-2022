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
            console.log(response["hourly"])
            return response["hourly"];
        }

        async function fetchHourlyWeather(city) {
            const [latitude, longitude] = await convertGeoLocation(city);
            const hourlyInfo = await fetchWeatherInfo(latitude, longitude);

            const NUMBER_OF_HOURS = 4;
            const temperature_info = [];
            for (let hour_idx = 0; hour_idx < NUMBER_OF_HOURS; ++hour_idx) {
                temperature_info.push(hourlyInfo[hour_idx]["temp"]);
            }
            return temperature_info;
        }

        fetchHourlyWeather(city).then(
            (result) => {
                setIsLoaded(true);
                setHourlyData([...result]);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
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