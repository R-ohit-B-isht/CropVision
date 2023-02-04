import React from "react";
import ReactDOM from "react-dom";
import ReactWeather from "react-open-weather";
//Optional include of the default css styles
// import "react-open-weather/lib/css/ReactWeather.css";

import "./weather.css";

function Weather() {
  return (
    <div className="Weather">
      <ReactWeather
        forecast="5days"
        apikey="7ad07aac9b0943040a4abdd2c23dfc4e"
        type="city"
        city="Patiala"
      />
    </div>
  );
}
export default Weather;
