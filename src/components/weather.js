const WEATHER_CODES = {
  0: 'Unknown',
  1000: 'Clear',
  1100: 'Mostly Clear',
  1101: 'Partly Cloudy',
  1102: 'Mostly Cloudy',
  1001: 'Cloudy',
  2000: 'Fog',
  2100: 'Light Fog',
  4000: 'Drizzle',
  4001: 'Rain',
  4200: 'Light Rain',
  4201: 'Heavy Rain',
  5000: 'Snow',
  5001: 'Flurries',
  5100: 'Light Snow',
  5101: 'Heavy Snow',
  6000: 'Freezing Drizzle',
  6001: 'Freezing Rain',
  6200: 'Light Freezing Rain',
  6201: 'Heavy Freezing Rain',
  7000: 'Ice Pellets',
  7101: 'Heavy Ice Pellets',
  7102: 'Light Ice Pellets',
  8000: 'Thunderstorm'
};

const WEATHER_ICONS = {
  1000: '☀️',
  1100: '🌤️',
  1101: '⛅',
  1102: '🌥️',
  1001: '☁️',
  2000: '🌫️',
  2100: '🌫️',
  4000: '🌧️',
  4001: '🌧️',
  4200: '🌧️',
  4201: '🌧️',
  5000: '❄️',
  5001: '❄️',
  5100: '❄️',
  5101: '❄️',
  6000: '🌨️',
  6001: '🌨️',
  6200: '🌨️',
  6201: '🌨️',
  7000: '🌨️',
  7101: '🌨️',
  7102: '🌨️',
  8000: '⛈️'
};

export async function displayWeather() {
  const container = document.getElementById('weather');
  container.innerHTML = `
    <div class="weather-container">
      <div class="loading-spinner"></div>
    </div>
  `;

  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    
    const { latitude, longitude } = position.coords;
    const res = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`);
    
    if (!res.ok) throw new Error('Failed to fetch weather');
    
    const data = await res.json();
    const weatherDescription = WEATHER_CODES[data.weather_code] || 'Unknown';
    const weatherIcon = WEATHER_ICONS[data.weather_code] || '✨';

    container.innerHTML = `
      <div class="weather-apple">
        <div class="location">Current Location</div>
        <div class="current-weather">
          <div class="temperature">${Math.round(data.temperature)}°</div>
          <div class="conditions">
            <span class="weather-icon">${weatherIcon}</span>
            <span class="weather-description">${weatherDescription}</span>
          </div>
        </div>
        <div class="weather-details">
          <div class="detail">
            <span class="label">FEELS LIKE</span>
            <span class="value">${Math.round(data.feels_like)}°</span>
          </div>
          <div class="detail">
            <span class="label">HUMIDITY</span>
            <span class="value">${data.humidity}%</span>
          </div>
          <div class="detail">
            <span class="label">WIND</span>
            <span class="value">${Math.round(data.wind_speed * 3.6)} km/h</span>
          </div>
        </div>
      </div>
    `;
  } catch (err) {
    console.error('Weather Error:', err);
    container.innerHTML = `
      <div class="weather-apple error">
        <div class="error-message">Unable to fetch weather data</div>
        <button class="retry-button" onclick="window.location.reload()">Try Again</button>
      </div>
    `;
  }
}
