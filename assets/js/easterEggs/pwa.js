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
  // All browsers support PWA would support template tag
  const template = document.querySelector('template[data-easter-egg=pwa]');
  const clone = document.importNode(template.content, true);
  const button = clone.querySelector('button');
  button.parentNode.classList.add('match');
  button.addEventListener('click', (e) => {
    e.preventDefault();
    swal({
      title: 'Yo! You have Service Worker!',
      text: 'You can click "Add the home screen" to install in your phone and access offline',
      icon: 'success',
    });
  });
  document.body.appendChild(clone);
}
