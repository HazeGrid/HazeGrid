import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lat, lon } = req.query;
  const apiKey = process.env.TOMORROW_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Server misconfigured: missing API key' });
  }

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Missing coordinates' });
  }

  const fields = [
    'temperature',
    'temperatureApparent',
    'temperatureMin',
    'temperatureMax',
    'humidity',
    'windSpeed'
  ];
  const timesteps = '1h';
  const units = 'metric';

  const url = `https://api.tomorrow.io/v4/weather/forecast?location=${lat},${lon}&fields=${fields.join(',')}&timesteps=${timesteps}&units=${units}&apikey=${apiKey}`;

  try {
    const r = await fetch(url);
    const data = await r.json();
    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch weather' });
  }
}