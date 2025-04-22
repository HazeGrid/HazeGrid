import { useEffect, useState } from 'react';

interface WeatherResponse {
  timelines: {
    hourly: {
      time: string;
      values: {
        temperature: number;
        temperatureApparent: number;
        temperatureMin: number;
        temperatureMax: number;
        humidity: number;
        windSpeed: number;
      };
    }[];
  };
}

export default function Home() {
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [query, setQuery] = useState('');
  const [unit, setUnit] = useState<'C' | 'F'>('C');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
        },
        () => console.log('Geolocation denied')
      );
    }
  }, []);

  useEffect(() => {
    if (lat !== null && lon !== null) {
      fetch(`/api/weather?lat=${lat}&lon=${lon}`)
        .then((r) => r.json())
        .then(setData)
        .catch(console.error);
    }
  }, [lat, lon]);

  const convertTemp = (tempC: number) => (unit === 'C' ? tempC : tempC * 9/5 + 32);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`);
    const results = await res.json();
    if (results && results[0]) {
      setLat(parseFloat(results[0].lat));
      setLon(parseFloat(results[0].lon));
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-4">
      <header className="w-full max-w-3xl flex flex-col items-center mb-8">
        <h1 className="text-4xl font-bold mb-4">HazeGrid Weather</h1>
        <form onSubmit={handleSearch} className="w-full flex mb-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow p-2 rounded-l-md border"
            placeholder="Search location..."
          />
          <button type="submit" className="px-4 rounded-r-md border border-l-0">
            Search
          </button>
        </form>
        <button
          className="mb-4 px-4 py-2 border rounded-md"
          onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}
        >
          °C / °F
        </button>
      </header>

      {data ? (
        <section className="w-full max-w-3xl grid gap-4">
          <div className="p-4 rounded-lg shadow bg-white dark:bg-gray-800">
            <h2 className="text-2xl font-semibold mb-2">Current</h2>
            <p className="text-xl">
              Temp: {convertTemp(data.timelines.hourly[0].values.temperature).toFixed(1)}°{unit}
            </p>
            <p>Feels Like: {convertTemp(data.timelines.hourly[0].values.temperatureApparent).toFixed(1)}°{unit}</p>
            <p>Humidity: {data.timelines.hourly[0].values.humidity}%</p>
            <p>Wind: {data.timelines.hourly[0].values.windSpeed} m/s</p>
            <p>
              Low / High: {convertTemp(data.timelines.hourly[0].values.temperatureMin).toFixed(1)}° / {convertTemp(data.timelines.hourly[0].values.temperatureMax).toFixed(1)}°
            </p>
          </div>

          <div className="p-4 rounded-lg shadow bg-white dark:bg-gray-800">
            <h2 className="text-2xl font-semibold mb-2">Next 24h Forecast</h2>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {data.timelines.hourly.slice(0, 24).map((h, idx) => (
                <li key={idx} className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-center">
                  <p className="text-sm">{new Date(h.time).getHours()}:00</p>
                  <p className="font-medium">
                    {convertTemp(h.values.temperature).toFixed(0)}°{unit}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : (
        <p>Loading weather...</p>
      )}
    </main>
  );
}