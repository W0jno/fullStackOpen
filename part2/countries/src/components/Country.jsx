import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/country.css";

function Country({ country }) {
  const countryLat = country.latlng[0];
  const countryLng = country.latlng[1];
  const apiKey = import.meta.env.VITE_API_KEY;
  const [weatherData, setWeatherData] = useState([]);
  //const weatherIcon = `openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${countryLat}&lon=${countryLng}&units=metric&appid=${apiKey}`
      )
      .then((res) => setWeatherData([res.data]));
  }, [country]);
  return (
    <div>
      <h1>{country.name.common}</h1>

      <div>
        <p>capital: {country.capital}</p>
        <p>area: {country.area} </p>
        <p> population: {country.population}</p>
      </div>
      {console.log(weatherData)}
      <div>
        <h3>languages:</h3>
        <ul>
          {Object.values(country.languages).map((language, key) => {
            return <li key={key}>{language}</li>;
          })}
        </ul>
      </div>
      <img src={country.flags.png} />
      {weatherData && weatherData[0] ? (
        <div>
          <h2>Weather in {country.capital}</h2>
          <p>temperature {weatherData[0].main.temp} Celsius</p>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData[0].weather[0].icon}.png`}
            alt="Weather icon"
            className="weatherIcon"
          />
          <p>wind {weatherData[0].wind.speed} m/s</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}

export default Country;
