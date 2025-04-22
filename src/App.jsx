import React, { useEffect, useState } from 'react';

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('C');

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

  const toggleUnit = () => {
    setUnit(unit === 'C' ? 'F' : 'C');
  };

  const convertTemp = (temp) => {
    return unit === 'C' ? `${Math.round(temp)}°C` : `${Math.round((temp * 9/5) + 32)}°F`;
  };

  return (
    <div className="app">
      <h1>HazeGrid's Weather</h1>
      <div className="unit-toggle">
        <button onClick={toggleUnit}>
          {unit === 'C' ? 'Show °F' : 'Show °C'}
        </button>
      </div>
      {error && <div className="error">{error}</div>}
      {!error && !weather && <div className="loading">Loading...</div>}
      {weather && (
        <div className="card">
          <p>Temp: {convertTemp(weather.temperature)}</p>
          <p>Feels Like: {convertTemp(weather.feels_like)}</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Wind: {Math.round(weather.wind_speed * 3.6)} km/h</p>
        </div>
      )}
    </div>
  );
}

export default App;
