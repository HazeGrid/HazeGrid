export async function displayCurrent(location = "Jaipur") {
  try {
    const res = await fetch(`/api/weather?location=${location}`);
    const data = await res.json();

    const weatherDisplay = `
      🌡 ${data.temperature}°C | 💨 ${data.wind_speed} km/h | ☁️ ${data.humidity}
    `;

    document.getElementById("app").innerText = weatherDisplay;
  } catch (err) {
    document.getElementById("app").innerText = "⚠️ Unable to load weather";
    console.error("Weather fetch error:", err);
  }
}
