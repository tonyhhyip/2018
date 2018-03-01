import $ from 'jquery';
// Floating-Fixed table of contents
setTimeout(() => {
  const $nav = $('nav');
  const $wrapper = $('.toc-wrapper');

  $wrapper.pushpin({
    top: $nav.height() + $('.theme-area').height() + 96,
    offset: $nav.height(),
  });
}, 100);
