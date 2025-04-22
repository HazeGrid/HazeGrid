import { displayCurrent } from './modules/current.js';

window.addEventListener('DOMContentLoaded', () => {
  displayCurrent(); // Default to Jaipur

  window.searchWeather = () => {
    const location = document.getElementById('locationInput').value;
    if (location) displayCurrent(location);
  };
});
