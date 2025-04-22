export default async function handler(req, res) {
  const apiKey = process.env.WEATHER_API_KEY;
  const { location, lat, lon } = req.query;
  
  // Default to Jaipur if no location or coordinates provided
  const query = location 
    ? `location=${encodeURIComponent(location)}`
    : lat && lon
    ? `location=${lat},${lon}`
    : `location=Jaipur`;

  const url = `https://api.tomorrow.io/v4/weather/forecast?${query}&timesteps=1h,1d&units=metric&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Weather API request failed');
    
    const data = await response.json();
    const current = data.timelines.hourly[0].values; // Use hourly for more current data

    res.status(200).json({
      temperature: current.temperature,
      wind_speed: current.windSpeed,
      humidity: current.humidity,
      weather_code: current.weatherCode,
      feels_like: current.temperatureApparent,
    });
  } catch (err) {
    console.error('Weather API Error:', err);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
}
