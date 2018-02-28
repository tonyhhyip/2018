import swal from 'sweetalert';

/* globals navigator, document, window */
export function match() {
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return false;
  }
  // is it Android
  if (navigator.userAgent.indexOf('Android') !== -1) {
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
      title: 'Yow! You have Service Worker!',
      text: 'You can click "Add the home screen" to install in your phone and access offline',
      icon: 'success',
    });
  });
}
