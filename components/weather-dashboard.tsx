"use client"

import { useEffect, useState } from "react"
import { WeatherHeader } from "./weather-header"
import { WeatherGrid } from "./weather-grid"
import { WeatherForecast } from "./weather-forecast"
import { getWeatherData } from "@/lib/weather"
import { LoadingScreen } from "./loading-screen"
import { getDynamicBackground } from "@/lib/weather"
import { SearchLocation } from "./search-location"
import { getWeatherDataByCity } from "@/lib/weather"
import { UnitToggle } from "./unit-toggle"
import { HourlyForecast } from "./hourly-forecast"

// Default cities for quick selection
const DEFAULT_CITIES = [
  { name: "New York", lat: 40.7128, lon: -74.006 },
  { name: "London", lat: 51.5074, lon: -0.1278 },
  { name: "Tokyo", lat: 35.6762, lon: 139.6503 },
  { name: "Sydney", lat: -33.8688, lon: 151.2093 },
]

export function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [location, setLocation] = useState<{ lat: number; lon: number }>(DEFAULT_CITIES[0])
  const [searchCity, setSearchCity] = useState<string | null>(null)
  const [unit, setUnit] = useState<"imperial" | "metric">("imperial")

  const handleSearch = (city: string) => {
    setSearchCity(city)
  }

  const handleUnitChange = (newUnit: "imperial" | "metric") => {
    setUnit(newUnit)
  }

  const handleDefaultCitySelect = (city: { name: string; lat: number; lon: number }) => {
    setSearchCity(null)
    setLocation({ lat: city.lat, lon: city.lon })
  }

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true)
        let data

        if (searchCity) {
          data = await getWeatherDataByCity(searchCity, unit)
          // Update location with the coordinates from the city search
          setLocation({ lat: data.coord.lat, lon: data.coord.lon })
          setSearchCity(null) // Clear search after successful fetch
        } else if (location) {
          data = await getWeatherData(location.lat, location.lon, unit)
        }

        setWeatherData(data)
        setError(null)
      } catch (err) {
        console.error("Error fetching weather data:", err)

        // If the error was from a city search, provide a more specific message
        if (searchCity) {
          setError(`Couldn't find weather data for "${searchCity}". Please check the spelling and try again.`)
        } else {
          setError("Failed to fetch weather data. Please try searching for a specific location.")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [location, searchCity, unit])

  if (loading) {
    return <LoadingScreen />
  }

  if (error || !weatherData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 text-white p-4">
        <h2 className="text-2xl font-semibold mb-4">Oops!</h2>
        <p className="text-lg mb-6">{error || "Something went wrong. Please try again later."}</p>
        <div className="flex flex-wrap justify-center gap-2">
          {DEFAULT_CITIES.map((city) => (
            <button
              key={city.name}
              onClick={() => handleDefaultCitySelect(city)}
              className="px-4 py-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            >
              {city.name}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${getDynamicBackground(weatherData.weather[0].main)} transition-colors duration-500`}>
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <SearchLocation onSearch={handleSearch} />
          <div className="flex flex-wrap gap-2">
            {DEFAULT_CITIES.map((city) => (
              <button
                key={city.name}
                onClick={() => handleDefaultCitySelect(city)}
                className="px-3 py-1 text-sm bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              >
                {city.name}
              </button>
            ))}
          </div>
          <UnitToggle onUnitChange={handleUnitChange} currentUnit={unit} />
        </div>
        <WeatherHeader
          location={weatherData.name}
          temperature={Math.round(weatherData.main.temp)}
          condition={weatherData.weather[0].main}
          description={weatherData.weather[0].description}
        />
        <WeatherGrid weatherData={weatherData} />
        <HourlyForecast lat={location.lat} lon={location.lon} unit={unit} />
        <WeatherForecast lat={location.lat} lon={location.lon} unit={unit} />
      </div>
    </div>
  )
}
