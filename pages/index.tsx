
import Head from 'next/head';
import Header from '../components/Header';
import LocationSearch from '../components/LocationSearch';
import CurrentWeather from '../components/CurrentWeather';
import WeatherTile from '../components/WeatherTile';
import Forecast from '../components/Forecast';
import TemperatureToggle from '../components/TemperatureToggle';
import Clock from '../components/Clock';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Head>
        <title>HazeGrid</title>
      </Head>
      <Header />
      <LocationSearch />
      <Clock />
      <CurrentWeather />
      <TemperatureToggle />
      <div className="text-center text-xs text-gray-400 mt-2">H: 29° | L: 28°</div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-6 py-4">
        <WeatherTile label="Feels Like" value="29°" description="Feels warmer than the actual temperature." />
        <WeatherTile label="Humidity" value="46%" description="Moderate humidity. Comfortable conditions." />
        <WeatherTile label="Visibility" value="10 km" description="It's perfectly clear right now." />
      </div>
      <Forecast />
    </div>
  );
}
