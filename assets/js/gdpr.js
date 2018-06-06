// import $ from 'jquery';

const GDPRKey = 'gdpr';

/* globals localStorage, document */

if (localStorage.getItem(GDPRKey) === null) {
  const modal = document.getElementById('gdpr');
  modal.classList.add('show');
  document.querySelector('[data-reply=agree]').addEventListener('click', () => {
    localStorage.setItem(GDPRKey, 'confirm');
    modal.classList.remove('show');
    import('./ga');
  });
} else {
  import('./ga')
}
