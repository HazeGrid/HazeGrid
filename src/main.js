import { createCurrentDisplay } from './modules/current.js';
import { createTimeline } from './modules/timeline.js';
import { createForecast } from './modules/forecast.js';

const app = document.getElementById('app');

async function fetchWeather() {
  const res = await fetch('/api/weather');
  const data = await res.json();

  app.appendChild(createCurrentDisplay(data));
  app.appendChild(createTimeline(data.timeline));
  app.appendChild(createForecast(data.forecast));
}

fetchWeather();