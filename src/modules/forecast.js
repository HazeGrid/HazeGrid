export function createForecast(forecast) {
  const card = document.createElement('div');
  card.className = 'card';

  const row = document.createElement('div');
  row.className = 'forecast';

  forecast.forEach(day => {
    const col = document.createElement('div');
    col.className = 'forecast-day';
    col.innerHTML = `<div>${day.day}</div><div>${day.icon}</div><div>${day.max}° / ${day.min}°</div>`;
    row.appendChild(col);
  });

  card.appendChild(row);
  return card;
}