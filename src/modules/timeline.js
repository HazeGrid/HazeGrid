export function createTimeline(timeline) {
  const card = document.createElement('div');
  card.className = 'card';
  const container = document.createElement('div');
  container.className = 'timeline';

  timeline.forEach(hour => {
    const el = document.createElement('div');
    el.className = 'timeline-item';
    el.innerHTML = `<div>${hour.time}</div><div>${hour.temp}°</div>`;
    container.appendChild(el);
  });

  card.appendChild(container);
  return card;
}