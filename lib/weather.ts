// Function to fetch current weather data
export async function getWeatherData(lat: number, lon: number, unit: "imperial" | "metric" = "imperial") {
  const url = `/api/weather?lat=${lat}&lon=${lon}&unit=${unit}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch weather data: ${response.statusText}`)
  }

  return response.json()
}

// Add this function to get weather data by city name
export async function getWeatherDataByCity(city: string, unit: "imperial" | "metric" = "imperial") {
  const url = `/api/weather?city=${encodeURIComponent(city)}&unit=${unit}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch weather data: ${response.statusText}`)
  }

  return response.json()
}

// Function to fetch forecast data
export async function getForecastData(lat: number, lon: number, unit: "imperial" | "metric" = "imperial") {
  const url = `/api/forecast?lat=${lat}&lon=${lon}&unit=${unit}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch forecast data: ${response.statusText}`)
  }

  return response.json()
}

// Add the getHourlyForecast function
export async function getHourlyForecast(lat: number, lon: number, unit: "imperial" | "metric" = "imperial") {
  // We can use the same forecast endpoint for hourly data
  return getForecastData(lat, lon, unit)
}

// Function to get dynamic background based on weather condition
export function getDynamicBackground(condition: string) {
  switch (condition.toLowerCase()) {
    case "clear":
      return "bg-gradient-to-b from-blue-400 to-blue-600 text-white"
    case "clouds":
      return "bg-gradient-to-b from-gray-300 to-gray-500 text-white"
    case "rain":
    case "drizzle":
      return "bg-gradient-to-b from-blue-700 to-blue-900 text-white"
    case "thunderstorm":
      return "bg-gradient-to-b from-gray-700 to-gray-900 text-white"
    case "snow":
      return "bg-gradient-to-b from-blue-100 to-blue-300 text-gray-800"
    case "mist":
    case "fog":
    case "haze":
      return "bg-gradient-to-b from-gray-400 to-gray-600 text-white"
    default:
      return "bg-gradient-to-b from-blue-400 to-blue-600 text-white"
  }
}
