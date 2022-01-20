import React from "react";
// import App from "./App";
import "./Warnings.css";
import warning from "./images/warning.jpeg";

fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_APIKEY}`
)
  .then((res) => res.json())
  .then((data) => console.log(data));

function Warnings(props) {
  return (
    <div>
      <div className="warning-container">
        <div className="warning-head">
          <span>
            <img src={warning} alt="warning" />
          </span>
          <h3>{props.warning} Alert</h3>
        </div>
        <div className="warning-info">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam.
          </p>
          <p>Affected Areas: {props.city}</p>
        </div>
        <div className="suggestions"></div>
      </div>
    </div>
  );
}

export default Warnings;
