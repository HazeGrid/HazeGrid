export async function displayWeather() {
  const container = document.getElementById('weather');
  container.innerHTML = "Loading...";

  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;
    const res = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`);
    const data = await res.json();

    container.innerHTML = `
      <div class="weather-card">
        <h1>HazeGrid</h1>
        <p>🌡️ ${data.temperature}°C</p>
        <p>🌬️ ${data.wind_speed} km/h</p>
        <p>💧 ${data.humidity}%</p>
      </div>
    `;
  }, () => {
    container.innerHTML = "Geolocation not allowed.";
  });
}