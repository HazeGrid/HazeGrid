import { displayCurrent } from './modules/current.js';

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/api/weather?location=jaipur');
    const data = await response.json();
    displayCurrent(data);
  } catch (err) {
    console.error("Failed to fetch weather data", err);
  }
});
