export default async function handler(req, res) {
  const apiKey = process.env.WEATHER_API_KEY;
  const { lat, lon } = req.query;

  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured" });
  }

  try {
    const response = await fetch(
      `https://api.tomorrow.io/v4/weather/realtime?location=${lat},${lon}&units=metric&apikey=${apiKey}`
    );

    if (!response.ok) throw new Error('API request failed');

    const data = await response.json();
    const values = data.data.values;

    res.status(200).json({
      name: data.location.name || "Your Location",
      temperature: values.temperature,
      feels_like: values.temperatureApparent,
      temp_max: values.temperature + 2,
      temp_min: values.temperature - 2,
      humidity: values.humidity,
      visibility: values.visibility,
      description: "Clear sky"  // replace with real mapping if needed
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
