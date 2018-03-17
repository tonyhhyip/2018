import Modernizr from 'modernizr';

/* globals navigator, document */
if (process.env.NODE_ENV === 'production' && Modernizr.serviceworker) {
  navigator.serviceWorker.register('/2018/service-worker.js')
    .then((registration) => {
      console.log('Finish registration');
      registration.addEventListener('updatefound', () => {
        // If updatefound is fired, it means that there's
        // a new service worker being installed.
        const installingWorker = registration.installing;
        console.log(`A new service worker is being installed: ${installingWorker}`);

        // You can listen for changes to the installing service worker's
        // state via installingWorker.onstatechange
        installingWorker.addEventListener('statechange', () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the old content will have been purged and
              // the fresh content will have been added to the cache.
              // It's the perfect time to display a "New content is
              // available; please refresh." message in your web app.

              /* globals document */
              const template = document.querySelector('template[data-easter-egg=update]');
              const clone = document.importNode(template.content, true);
              const message = clone.querySelector('div.notice-card');
              const close = clone.querySelector('i.close');
              const btn = clone.querySelector('button.pulse');
              close.addEventListener('click', () => {
                message.classList.remove('active');
                btn.parentNode.classList.remove('hide');
              });

              btn.addEventListener('click', () => {
                message.classList.add('active');
                btn.parentNode.classList.add('hide');
              });

              document.body.appendChild(clone);
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log('Content is cached for offline use.');
            }
          }
        });
      });
    });
}
