import Modernizr from 'modernizr';

/* globals navigator */
if (process.env.NODE_ENV === 'production' && Modernizr.serviceworker) {
  navigator.serviceWorker.register('/2018/service-worker.js');
}
