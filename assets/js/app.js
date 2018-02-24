import 'babel-polyfill';
import './ga';
import '../scss/app.scss';
import './toc';

/* globals $, window, navigator */

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/2018/service-worker.js');
}

if (process.env.NODE_ENV === 'production' && window.location.host !== 'localhost' && window.location.protocol !== 'https:') {
  window.location.href = window.location.href.replace('http://', 'https://');
}

$('.button-collapse').sideNav();
$('.collapsible').collapsible();
$('.collapsible a.collapsible-header').click((e) => { e.preventDefault(); });
$('.scrollspy').scrollSpy();

