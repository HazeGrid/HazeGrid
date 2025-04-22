export default async function handler(req, res) {
  const apiKey = process.env.WEATHER_API_KEY;
  const location = req.query.location || "Jaipur";

  const url = `https://api.tomorrow.io/v4/weather/forecast?location=${location}&timesteps=1h,1d&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const current = data.timelines.daily[0].values;

    res.status(200).json({
      temperature: current.temperatureAvg,
      wind_speed: current.windSpeedAvg,
      humidity: current.humidityAvg,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Weather API failed." });
  }
}
