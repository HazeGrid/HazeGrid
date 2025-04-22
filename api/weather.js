export default async function handler(req, res) {
  const apiKey = process.env.WEATHER_API_KEY;
  const { lat, lon } = req.query;

  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured" });
  }

  try {
    const response = await fetch(
      `https://api.tomorrow.io/v4/weather/forecast?location=${lat},${lon}&timesteps=1h&units=metric&apikey=${apiKey}`
    );

    if (!response.ok) throw new Error('API request failed');

    const data = await response.json();
    const current = data.timelines.hourly[0].values;

    res.status(200).json({
      temperature: current.temperature,
      wind_speed: current.windSpeed,
      humidity: current.humidity,
      weather_code: current.weatherCode,
      feels_like: current.temperatureApparent
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}