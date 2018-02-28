/* globals window */
if (process.env.NODE_ENV === 'production' && window.location.host !== 'localhost' && window.location.protocol !== 'https:') {
  window.location.href = window.location.href.replace('http://', 'https://');
}
