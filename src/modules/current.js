export async function displayCurrent() {
  try {
    const res = await fetch('/api/weather?location=jaipur');
    const data = await res.json();
    console.log("Current weather data:", data);

    const app = document.getElementById('app');
    app.innerText = `🌡️ ${data.temp}°C | 💨 ${data.wind_speed} km/h | ☁️ ${data.description}`;
  } catch (err) {
    console.error("Failed to fetch weather:", err);
    document.getElementById('app').innerText = "⚠️ Failed to load weather.";
  }
}
