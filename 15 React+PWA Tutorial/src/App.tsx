import React from "react";

import {fetchWeather} from "./fetchWeather";
import "./App.scss";

const App = () => {
  const [query, setQuery] = React.useState("");
  const [weather, setWeather] = React.useState<Data | any>({});

  const search = async (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      const data = await fetchWeather(query);
      setWeather(data);
      // console.log("data:", data);
      setQuery("");
    }
  };

  return (
    <div className="main-container">
      <input
        type="text"
        className="search"
        placeholder="Enter a town to see the weather..."
        value={query}
        onChange={(event) => setQuery(event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1))}
        onKeyPress={search}
      />
      {weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
