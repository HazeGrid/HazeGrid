
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const API_KEY = process.env.TOMORROW_API_KEY;
const BASE_URL = 'https://api.tomorrow.io/v4/weather/realtime';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Missing latitude or longitude' });
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        location: `${lat},${lon}`,
        apikey: API_KEY,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
}
