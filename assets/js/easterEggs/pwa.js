import swal from 'sweetalert';
import Modernizr from 'modernizr';

/* globals navigator, document, window */

export function match() {
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return false;
  }
  // is it Android
  if (Modernizr.serviceworker && Modernizr.android) {
    return navigator.userAgent.match(/Firefox|Chrome/);
  }

  return false;
}

export function add() {
  const button = document.querySelector('[data-easter-egg=pwa] > button');
  button.parentNode.classList.add('match');
  button.addEventListener('click', (e) => {
    e.preventDefault();
    swal({
      title: 'Yo! You have Service Worker!',
      text: 'You can click "Add the home screen" to install in your phone and access offline',
      icon: 'success',
    });
  });
}
