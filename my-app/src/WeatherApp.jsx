import React, { useState } from 'react';
import axios from 'axios';

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');

    const fetchWeather = async () => {
        if (!city) {
            setError('Please enter a city name');
            return;
        }

        try {
            const response = await axios.get('http://localhost:5000/api/weather', {
                params: { city },
            });
            setWeatherData(response.data);
            setError('');
        } catch (err) {
            setError('Could not fetch weather data');
            setWeatherData(null);
        }
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Weather App</h1>
            <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={fetchWeather}>Get Weather</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {weatherData && (
                <div>
                    <h2>{weatherData.name}</h2>
                    <p>Temperature: {weatherData.main.temp} °C</p>
                    <p>Condition: {weatherData.weather[0].description}</p>
                </div>
            )}
        </div>
    );
};

export default WeatherApp;
