import React, { useState, useEffect } from 'react';

function App() {
  const [weather, setWeather] = useState(null);
  const [query, setQuery] = useState('');
  const [unit, setUnit] = useState('C');
  const [theme, setTheme] = useState('dark');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    fetchWeatherByCoords();
    return () => clearInterval(timer);
  }, []);

  const fetchWeatherByCoords = () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const res = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`);
      const data = await res.json();
      setWeather(data);
    });
  };

  const fetchWeatherByCity = async () => {
    if (!query) return;
    const res = await fetch(`/api/weather?q=${query}`);
    const data = await res.json();
    setWeather(data);
  };

  const convertTemp = (temp) =>
    unit === 'C' ? `${Math.round(temp)}°C` : `${Math.round((temp * 9) / 5 + 32)}°F`;

  const smartDescription = () => {
    const diff = weather.feels_like - weather.temperature;
    if (Math.abs(diff) < 2) return 'Feels like actual temperature.';
    return diff > 0 ? 'Feels warmer than the actual temperature.' : 'Feels cooler than the actual temperature.';
  };

  const currentTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const currentDay = time.toLocaleDateString(undefined, { weekday: 'long' });

  return (
    <div className={`app ${theme}`}>
      <div className="top-bar">
        <div className="search">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search location..." />
          <button onClick={fetchWeatherByCity}>Search</button>
        </div>
        <div className="actions">
          <button onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}>
            {unit}
          </button>
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      {weather && (
        <>
          <div className="info-header">
            <div>{currentDay}</div>
            <div className="location">📍 {weather.name}</div>
            <div>{currentTime}</div>
          </div>
          <div className="main-temp">
            {convertTemp(weather.temperature)}
            <div className="description">{weather.description}</div>
            <div className="range">H: {convertTemp(weather.temp_max)} / L: {convertTemp(weather.temp_min)}</div>
          </div>
          <div className="tiles">
            <div className="tile">
              <strong>Feels Like</strong>
              <p>{convertTemp(weather.feels_like)}</p>
              <span>{smartDescription()}</span>
            </div>
            <div className="tile">
              <strong>Humidity</strong>
              <p>{weather.humidity}%</p>
              <span>Moderate humidity.</span>
            </div>
            <div className="tile">
              <strong>Visibility</strong>
              <p>{weather.visibility / 1000} km</p>
              <span>It’s perfectly clear right now.</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
