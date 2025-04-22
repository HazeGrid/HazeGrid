export default async function handler(req, res) {
  const apiKey = process.env.WEATHER_API_KEY;
  const location = req.query.location || "jaipur";
  const url = `https://api.tomorrow.io/v4/weather/forecast?location=${location}&timesteps=1h,1d&apikey=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Weather API failed." });
  }
}