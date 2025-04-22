
"use client";
import React, { useEffect, useState } from 'react';

interface WeatherData {
  values: {
    temperature: number;
    weatherCode: number;
  };
}

const CurrentWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
      const data = await res.json();
      setWeather(data.data);
    });
  }, []);

  return (
    <div className="px-6 py-8 text-center">
      <div className="text-sm text-gray-400">Today</div>
      <div className="text-6xl font-bold my-4">
        {weather ? `${Math.round(weather.values.temperature)}°` : '...'}
      </div>
      <div className="text-lg text-gray-300">
        {weather ? `Code: ${weather.values.weatherCode}` : 'Loading...'}
      </div>
    </div>
  );
};

export default CurrentWeather;
