"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getForecastData } from "@/lib/weather"
import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun } from "lucide-react"

interface WeatherForecastProps {
  lat: number
  lon: number
  unit?: "imperial" | "metric"
}

export function WeatherForecast({ lat, lon, unit = "imperial" }: WeatherForecastProps) {
  const [forecastData, setForecastData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setLoading(true)
        const data = await getForecastData(lat, lon, unit)

        // Process the forecast data to get daily forecasts
        const dailyForecasts = processForecastData(data.list)
        setForecastData(dailyForecasts)
        setError(null)
      } catch (err) {
        console.error("Error fetching forecast data:", err)
        setError("Failed to fetch forecast data.")
      } finally {
        setLoading(false)
      }
    }

    fetchForecast()
  }, [lat, lon, unit])

  if (loading) {
    return (
      <Card className="bg-white/10 border-none backdrop-blur-sm">
        <CardHeader>
          <CardTitle>5-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <p>Loading forecast...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error || forecastData.length === 0) {
    return (
      <Card className="bg-white/10 border-none backdrop-blur-sm">
        <CardHeader>
          <CardTitle>5-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <p>{error || "No forecast data available."}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/10 border-none backdrop-blur-sm">
      <CardHeader>
        <CardTitle>5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-2">
          {forecastData.map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-sm font-medium">{day.day}</div>
              {getWeatherIcon(day.condition)}
              <div className="text-sm mt-1">
                {Math.round(day.maxTemp)}° / {Math.round(day.minTemp)}°
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function processForecastData(forecastList: any[]) {
  const dailyData: Record<string, any> = {}

  forecastList.forEach((item) => {
    const date = new Date(item.dt * 1000)
    const day = date.toLocaleDateString("en-US", { weekday: "short" })

    if (!dailyData[day]) {
      dailyData[day] = {
        day,
        maxTemp: item.main.temp_max,
        minTemp: item.main.temp_min,
        condition: item.weather[0].main,
      }
    } else {
      dailyData[day].maxTemp = Math.max(dailyData[day].maxTemp, item.main.temp_max)
      dailyData[day].minTemp = Math.min(dailyData[day].minTemp, item.main.temp_min)
    }
  })

  return Object.values(dailyData).slice(0, 5)
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
