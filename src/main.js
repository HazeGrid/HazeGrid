navigator.geolocation.getCurrentPosition(
  async (position) => {
    const { latitude, longitude } = position.coords;
    const response = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`);
    const data = await response.json();
    displayCurrent(data);
  },
  (error) => {
    console.error("Geolocation error:", error);
    // fallback if permission denied
    displayCurrent({ error: "Location access denied" });
  }
);
