'use client';
import React, { useEffect, useState } from 'react';

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState("Your Location");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
      const data = await res.json();
      setWeather(data);
    });

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!weather) return <div className="loading">Loading...</div>;

  return (
    <main className="app">
      <div className="card dark">
        <div className="top-bar">
          <input type="text" placeholder="Search location..." />
          <button>Search</button>
          <div>{currentTime.toLocaleTimeString()}</div>
        </div>
        <h1>{location}</h1>
        <h2>{Math.round(weather.temperature)}°C</h2>
        <p>{weather.description}</p>
        <div className="tiles">
          <div className="tile">
            <strong>Feels Like</strong>
            <p>{Math.round(weather.feels_like)}°C</p>
            <span>{weather.feels_like > weather.temperature ? "Feels warmer" : "Feels cooler"} than actual temperature.</span>
          </div>
          <div className="tile">
            <strong>Humidity</strong>
            <p>{weather.humidity}%</p>
            <span>Moderate humidity.</span>
          </div>
          <div className="tile">
            <strong>Visibility</strong>
            <p>{weather.visibility} km</p>
            <span>It's perfectly clear right now.</span>
          </div>
        </div>
      </div>
    </main>
  );
}
