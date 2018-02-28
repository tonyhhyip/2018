/* globals window, document */

window.addEventListener('online', () => {
  document.body.setAttribute('data-network', 'online');
});

window.addEventListener('offline', () => {
  document.body.setAttribute('data-network', 'offline');
});
