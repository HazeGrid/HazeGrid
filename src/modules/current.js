export function createCurrentDisplay(data) {
  const card = document.createElement('div');
  card.className = 'card';

  const temp = document.createElement('div');
  temp.className = 'temp-display';
  const c = data.temp;
  const f = (c * 9 / 5) + 32;
  temp.textContent = `${f.toFixed(0)}°F / ${c.toFixed(0)}°C`;

  const desc = document.createElement('div');
  desc.className = 'temp-sub';
  desc.textContent = data.description;

  const extra = document.createElement('div');
  extra.className = 'temp-sub';
  extra.textContent = `Humidity: ${data.humidity}% • Wind: ${data.wind_speed} m/s`;

  if (data.alert) {
    const alert = document.createElement('div');
    alert.className = 'alert';
    alert.textContent = `⚠️ ${data.alert}`;
    card.appendChild(alert);
  }

  card.appendChild(temp);
  card.appendChild(desc);
  card.appendChild(extra);

  return card;
}