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
   return (
  <div className="container">
    <header>
      <img src="/logo.png" alt="HazeGrid Logo" className="logo" />
      <h1>HazeGrid</h1>
    </header>

    {error && <div className="error">{error}</div>}
    {!error && !weather && <div className="loading">Loading...</div>}

    {weather && (
      <div className="card">
        <div className="big-temp">
          {Math.round(weather.temperature)}°
          <div className="desc">Clear</div>
        </div>
        <div className="grid">
          <div className="tile"><strong>Feels Like:</strong> {Math.round(weather.feels_like)}°</div>
          <div className="tile"><strong>Humidity:</strong> {weather.humidity}%</div>
          <div className="tile"><strong>Wind:</strong> {Math.round(weather.wind_speed * 3.6)} km/h</div>
        </div>
      </div>
    )}
  </div>
);
