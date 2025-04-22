import { useEffect, useState, FormEvent } from 'react';

/* ---------- Types that match /api/weather response ---------- */
interface Hour {
  startTime: string;
  values: {
    temperature: number;
    temperatureApparent: number;
    temperatureMin: number;
    temperatureMax: number;
    humidity: number;
    windSpeed: number;
  };
}
interface WeatherResponse {
  hourly: Hour[];
}

/* ---------- Component ---------- */
export default function Home() {
  /* coords & weather state */
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const [data, setData] = useState<WeatherResponse | null>(null);

  /* UI helpers */
  const [query, setQuery] = useState('');
  const [unit, setUnit] = useState<'C' | 'F'>('C');

  /* ───── 1. Get location (10 s timeout, fallback to Delhi) ───── */
  const FALLBACK = { lat: 28.6139, lon: 77.2090 }; // change if you like

  useEffect(() => {
    let settled = false;

    const ok = (p: GeolocationPosition) => {
      settled = true;
      setLat(p.coords.latitude);
      setLon(p.coords.longitude);
    };
    const fail = () => {
      settled = true;
      setLat(FALLBACK.lat);
      setLon(FALLBACK.lon);
    };

    navigator.geolocation?.getCurrentPosition(ok, fail, {
      enableHighAccuracy: true,
      timeout: 10_000
    });

    /* Safari private‑mode may ignore the call entirely */
    setTimeout(() => !settled && fail(), 10_000);
  }, []);

  /* ───── 2. Fetch weather whenever coords change ───── */
  useEffect(() => {
    if (lat == null || lon == null) return;
    fetch(`/api/weather?lat=${lat}&lon=${lon}`)
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, [lat, lon]);

  /* ───── 3. Helpers ───── */
  const convert = (c: number) => (unit === 'C' ? c : c * 9 / 5 + 32);

  async function handleSearch(e: FormEvent) {
    e.preventDefault();
    if (!query) return;
    const g = await fetch(`/api/geocode?q=${encodeURIComponent(query)}`).then(r => r.json());
    if (g.lat) {
      setLat(parseFloat(g.lat));
      setLon(parseFloat(g.lon));
    }
  }

  /* ───── 4. Render ───── */
  if (!data || data.hourly.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Loading weather…
      </main>
    );
  }

  const current = data.hourly[0].values;

  return (
    <main className="min-h-screen flex flex-col items-center p-4">
      {/* Header */}
      <header className="w-full max-w-3xl flex flex-col items-center mb-8">
        <h1 className="text-4xl font-bold mb-4">HazeGrid Weather</h1>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="w-full flex mb-4">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-grow p-2 rounded-l-md border bg-transparent"
            placeholder="Search location…"
          />
          <button className="px-4 rounded-r-md border border-l-0">Search</button>
        </form>

        {/* °C / °F toggle */}
        <button
          className="mb-4 px-4 py-2 border rounded-md"
          onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}
        >
          °C / °F
        </button>
      </header>

      {/* Weather cards */}
      <section className="w-full max-w-3xl grid gap-4">
        {/* Current */}
        <div className="p-4 rounded-lg shadow bg-white dark:bg-gray-800">
          <h2 className="text-2xl font-semibold mb-2">Current</h2>
          <p className="text-xl">
            Temp: {convert(current.temperature).toFixed(1)}°{unit}
          </p>
          <p>Feels Like: {convert(current.temperatureApparent).toFixed(1)}°{unit}</p>
          <p>Humidity: {current.humidity}%</p>
          <p>Wind: {current.windSpeed} m/s</p>
          <p>
            Low / High: {convert(current.temperatureMin).toFixed(1)}° /{' '}
            {convert(current.temperatureMax).toFixed(1)}°
          </p>
        </div>

        {/* Next 24 h */}
        <div className="p-4 rounded-lg shadow bg-white dark:bg-gray-800">
          <h2 className="text-2xl font-semibold mb-2">Next 24 h</h2>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {data.hourly.slice(0, 24).map((h, i) => (
              <li key={i} className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-center">
                <p className="text-sm">{new Date(h.startTime).getHours()}:00</p>
                <p className="font-medium">
                  {convert(h.values.temperature).toFixed(0)}°{unit}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
