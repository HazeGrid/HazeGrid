export default async function handler(req, res) {
  const apiKey = process.env.WEATHER_API_KEY;
  const location = req.query.location || "jaipur";

  const url = `https://api.tomorrow.io/v4/weather/forecast?location=${location}&timesteps=1h,1d&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const current = data.timelines.daily[0].values;
    const hourly = data.timelines.hourly.slice(0, 8).map(hour => ({
      time: new Date(hour.time).toLocaleTimeString([], { hour: '2-digit' }),
      temp: hour.values.temperature
    }));
    const daily = data.timelines.daily.slice(0, 7).map(day => ({
      day: new Date(day.time).toLocaleDateString('en-US', { weekday: 'short' }),
      icon: "☀️",
      max: day.values.temperatureMax,
      min: day.values.temperatureMin,
      uv: day.values.uvIndexAvg,
      wind_speed: day.values.windSpeedAvg
    }));

    res.status(200).json({
      temp: current.temperatureAvg,
      description: "Sunny",
      humidity: current.humidityAvg,
      wind_speed: current.windSpeedAvg,
      visibility: current.visibilityAvg,
      uv: current.uvIndexAvg,
      alert: "Excessive Heat",
      timeline: hourly,
      forecast: daily,
      location
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Weather API failed." });
  }
}
