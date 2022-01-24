import React from "react";


function WeatherAlerts({weather,stats}){
    
    let imgpath;

    if(weather.icon)
    imgpath = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`;
    else
    imgpath = `http://openweathermap.org/img/wn/10d@2x.png`;

    return (

        <div className="WeatherAlertsSection">

        <h1>This is the Weather Alerts Section </h1>

        <p>{weather.main}</p>
        <p>{weather.description}</p>
        <p>{weather.id}</p>
        <img src={imgpath} alt="" />


        </div>


    )


}


export default WeatherAlerts;