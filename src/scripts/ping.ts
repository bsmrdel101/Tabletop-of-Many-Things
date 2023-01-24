let eventsBound = false;

export const bindEventsToPing = () => {
  if (eventsBound) return;
  eventsBound = true;
  const grid: Element = document.querySelector('.grid');

  // Toggle ping mode

  // Handle ping event
  grid.addEventListener('mousedown', (e: any) => {
    if (e.button === 0) {
      pingArea(e.target);
    }
  });
};

// Place animated circle ping
const pingArea = (target: Element) => {
  const ping: any = document.createElement('div');
  ping.classList.add('ping');
  target.appendChild(ping);
  setTimeout(() => ping.remove(), 500);
};
