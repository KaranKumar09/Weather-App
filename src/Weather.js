import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
    const [city, setCity] = useState(""); 
    const [weatherData, setWeatherData] = useState(null); 
    const [error, setError] = useState(""); 
    const handleCityChange = (event) => {
        setCity(event.target.value);
    };
    const fetchWeather = async () => {
        if (!city) {
            setError("Please enter a city name.");
            return;
        }
        setError("");
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=76533bfd79d59548a1ed3d4c9c0816fa&units=metric`
            );
            setWeatherData(response.data); 
            console.log(response.data);
        } catch (err) {
            console.error("Error fetching weather:", err);
            setError("Failed to fetch weather. Please try again.");
        }
    };
    return (
        <div className="weather-container">
            <h1 className="app-name">Weather App</h1>
            <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={handleCityChange}
            />
            <button onClick={fetchWeather}>Get Weather</button>

            {error && <p style={{ color: "red" }}>{error}</p>}
            
            {weatherData && (
                <div>
                    <h3>Weather in {weatherData.name}</h3>
                    <p>Temperature: {weatherData.main.temp}°C</p>
                    <p>Weather: {weatherData.weather[0].description}</p>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                    <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                </div>
            )}
        </div>
    );
}