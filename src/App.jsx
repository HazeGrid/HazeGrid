import React, { useEffect, useState } from 'react';

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      try {
        const res = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`);
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        setError('Failed to fetch weather data.');
      }
    }, () => {
      setError('Location permission denied.');
    });
  }, []);

  if (error) return <div className="error">{error}</div>;
  if (!weather) return <div className="loading">Loading...</div>;

  return (
    <div className="app">
      <h1>HazeGrid's Weather</h1>
      <div className="card">
        <p>Temp: {Math.round(weather.temperature)}°C</p>
        <p>Feels Like: {Math.round(weather.feels_like)}°C</p>
        <p>Humidity: {weather.humidity}%</p>
        <p>Wind: {Math.round(weather.wind_speed * 3.6)} km/h</p>
      </div>
    </div>
  );
}

export default App;