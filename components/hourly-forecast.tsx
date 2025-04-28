"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getHourlyForecast } from "@/lib/weather"
import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun } from "lucide-react"

interface HourlyForecastProps {
  lat: number
  lon: number
  unit?: "imperial" | "metric"
}

export function HourlyForecast({ lat, lon, unit = "imperial" }: HourlyForecastProps) {
  const [hourlyData, setHourlyData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHourlyForecast = async () => {
      try {
        setLoading(true)
        const data = await getHourlyForecast(lat, lon, unit)

        // Process the first 24 hours (8 entries, 3 hours each)
        const hourlyForecasts = data.list.slice(0, 8).map((item: any) => {
          const date = new Date(item.dt * 1000)
          return {
            time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            temp: Math.round(item.main.temp),
            condition: item.weather[0].main,
          }
        })

        setHourlyData(hourlyForecasts)
        setError(null)
      } catch (err) {
        console.error("Error fetching hourly forecast data:", err)
        setError("Failed to fetch hourly forecast data.")
      } finally {
        setLoading(false)
      }
    }

    fetchHourlyForecast()
  }, [lat, lon, unit])

  if (loading) {
    return (
      <Card className="bg-white/10 border-none backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Hourly Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <p>Loading hourly forecast...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error || hourlyData.length === 0) {
    return (
      <Card className="bg-white/10 border-none backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Hourly Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <p>{error || "No hourly forecast data available."}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/10 border-none backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Hourly Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex overflow-x-auto pb-2 gap-4">
          {hourlyData.map((hour, index) => (
            <div key={index} className="flex flex-col items-center min-w-[70px]">
              <div className="text-sm font-medium">{hour.time}</div>
              {getWeatherIcon(hour.condition)}
              <div className="text-sm mt-1">{hour.temp}°</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
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
