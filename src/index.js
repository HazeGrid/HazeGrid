document.addEventListener('DOMContentLoaded', async () => {
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
        <div class="conditions">🌤️ Clear</div>
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
});
