const WEATHER_ICONS = {
    1000: '☀️', 1100: '🌤️', 1101: '⛅', 
    1102: '🌥️', 1001: '☁️', 2000: '🌫️',
    4000: '🌧️', 4001: '🌧️', 5001: '❄️',
    8000: '⛈️'
  };
  
  export async function displayWeather() {
    const container = document.getElementById('weather');
    container.innerHTML = '<div class="spinner"></div>';
  
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
  
      const { latitude, longitude } = position.coords;
      const response = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`);
      const data = await response.json();
  
      container.innerHTML = `
        <div class="weather-card">
          <h2>Current Location</h2>
          <div class="temp">${Math.round(data.temperature)}°</div>
          <div class="conditions">
            ${WEATHER_ICONS[data.weather_code] || '✨'} 
            ${getConditionText(data.weather_code)}
          </div>
          <div class="details">
            <div>Feels Like: ${Math.round(data.feels_like)}°</div>
            <div>Humidity: ${data.humidity}%</div>
            <div>Wind: ${Math.round(data.wind_speed * 3.6)} km/h</div>
          </div>
        </div>
      `;
    } catch (error) {
      container.innerHTML = `
        <div class="error">
          <p>${error.message}</p>
          <button onclick="location.reload()">Retry</button>
        </div>
      `;
    }
  }
  
  function getConditionText(code) {
    const conditions = {
      1000: 'Clear', 1100: 'Mostly Clear', 1101: 'Partly Cloudy',
      1102: 'Mostly Cloudy', 1001: 'Cloudy', 2000: 'Fog',
      4000: 'Drizzle', 4001: 'Rain', 5001: 'Snow', 8000: 'Thunderstorm'
    };
    return conditions[code] || 'N/A';
  }