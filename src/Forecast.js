import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const Forecast = () => {
  const [city, setCity] = useState("New Delhi");
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [date, setDate] = useState(new Date());

  const getForecast = useCallback((city) => {
    const apiKey = "ffb786b3f2bba34t9ab39o0cf4afb092";
    const apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
    axios(apiUrl).then((response) => {
      setForecast(response.data.daily.slice(0, 5));
    });
  }, []);

  const searchCity = useCallback(
    (city) => {
      const apiKey = "ffb786b3f2bba34t9ab39o0cf4afb092";
      const url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
      axios.get(url).then((response) => {
        const data = response.data;
        setCurrentWeather({
          city: data.city,
          temp: Math.round(data.temperature.current),
          condition: data.condition.description,
          humidity: data.temperature.humidity,
          wind: data.wind.speed,
          iconUrl: data.condition.icon_url,
        });
        getForecast(data.city);
      });
    },
    [getForecast]
  );

  useEffect(() => {
    searchCity(city);
  }, [city, searchCity]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    const inputCity = event.target.elements.city.value;
    setCity(inputCity);
  };

  const formatDay = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
  };

  return (
    <div className="contents">
      <header>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            name="city"
            placeholder="Enter a City.."
            className="search"
            style={{ padding: "20px" }}
            id="input-button"
          />
          <input type="submit" value="Search" className="button" />
        </form>
      </header>
      <div className="weather">
        <div className="cities">
          <h1>{currentWeather.city}</h1>
          <p>
            <span className="day">
              {
                [
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ][date.getDay()]
              }
            </span>
            <span className="hr"> {date.getHours()}</span>:
            <span className="min">{date.getMinutes()}</span>
            <span id="condition"> {currentWeather.condition}</span>
            <br />
            Humidity:
            <strong>
              <span id="humidity"> {currentWeather.humidity}%</span>
            </strong>
            , Wind:
            <strong>
              <span id="wind"> {currentWeather.wind} km/h</span>
            </strong>
          </p>
        </div>
        <div className="temp">
          <span id="icon">
            <img
              src={currentWeather.iconUrl}
              alt="Weather Icon"
              className="current-temperature-icon"
            />
          </span>
          <span className="current-temperature-value" id="tempNew">
            {currentWeather.temp}
          </span>
          <span class="current-temperature-unit">°C</span>
        </div>
      </div>

      <div className="weather-forecast-container" id="forecast">
        {forecast.map((day, index) => (
          <div key={index} className="weather-forecast">
            <div className="forecast-day">{formatDay(day.time)}</div>
            <div className="forecast-icon">
              <img
                src={day.condition.icon_url}
                width="60"
                alt="Forecast Icon"
              />
            </div>
            <div className="forecast-temp">
              <span className="high-temp">
                {Math.round(day.temperature.maximum)}°
              </span>
              <span className="low-temp">
                {Math.round(day.temperature.minimum)}°
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
