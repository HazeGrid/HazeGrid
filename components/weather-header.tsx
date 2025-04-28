import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun } from "lucide-react"

interface WeatherHeaderProps {
  location: string
  temperature: number
  condition: string
  description: string
}

export function WeatherHeader({ location, temperature, condition, description }: WeatherHeaderProps) {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-2xl font-medium">{location}</h1>
      <div className="flex flex-col items-center">
        <div className="text-8xl font-thin">{temperature}°</div>
        <div className="flex items-center gap-2 mt-2">
          {getWeatherIcon(condition)}
          <span className="text-xl capitalize">{description}</span>
        </div>
      </div>
    </div>
  )
}

function getWeatherIcon(condition: string) {
  const iconSize = 24

  switch (condition.toLowerCase()) {
    case "clear":
      return <Sun size={iconSize} />
    case "clouds":
      return <Cloud size={iconSize} />
    case "rain":
      return <CloudRain size={iconSize} />
    case "drizzle":
      return <CloudDrizzle size={iconSize} />
    case "thunderstorm":
      return <CloudLightning size={iconSize} />
    case "snow":
      return <CloudSnow size={iconSize} />
    case "mist":
    case "fog":
    case "haze":
      return <CloudFog size={iconSize} />
    default:
      return <Sun size={iconSize} />
  }
}
