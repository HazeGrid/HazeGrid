import { Droplets, Eye, Gauge, Sunrise, Sunset, Thermometer, Wind } from "lucide-react"
import { WeatherCard } from "./weather-card"

interface WeatherGridProps {
  weatherData: any
}

export function WeatherGrid({ weatherData }: WeatherGridProps) {
  const sunrise = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })
  const sunset = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <WeatherCard
        title="Feels Like"
        value={`${Math.round(weatherData.main.feels_like)}°`}
        icon={<Thermometer className="h-5 w-5" />}
      />
      <WeatherCard title="Humidity" value={`${weatherData.main.humidity}%`} icon={<Droplets className="h-5 w-5" />} />
      <WeatherCard
        title="Wind"
        value={`${Math.round(weatherData.wind.speed)} mph`}
        icon={<Wind className="h-5 w-5" />}
      />
      <WeatherCard title="Pressure" value={`${weatherData.main.pressure} hPa`} icon={<Gauge className="h-5 w-5" />} />
      <WeatherCard
        title="Visibility"
        value={`${(weatherData.visibility / 1000).toFixed(1)} km`}
        icon={<Eye className="h-5 w-5" />}
      />
      <WeatherCard title="Sunrise" value={sunrise} icon={<Sunrise className="h-5 w-5" />} />
      <WeatherCard title="Sunset" value={sunset} icon={<Sunset className="h-5 w-5" />} />
      <WeatherCard
        title="Max Temp"
        value={`${Math.round(weatherData.main.temp_max)}°`}
        icon={<Thermometer className="h-5 w-5" />}
      />
    </div>
  )
}
