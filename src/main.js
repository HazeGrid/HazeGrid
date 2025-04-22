import { displayCurrent } from './modules/current.js';

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('/api/weather?location=jaipur');
    const data = await res.json();
    displayCurrent(data); // Pass actual data to current.js
  } catch (err) {
    console.error('Failed to fetch weather:', err);
    document.getElementById('app').innerText = 'Error loading weather data.';
  }
});
