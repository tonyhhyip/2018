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

              /* globals document, window */
              const btn = document.createElement('button');
              btn.classList.add('btn', 'btn-large', 'btn-floating', 'pulse', 'secondary');
              const icon = document.createElement('i');
              icon.classList.add('large', 'material-icons', 'primary-text');
              icon.innerText = 'autorenew';
              btn.appendChild(icon);

              const wrapper = document.createElement('div');
              wrapper.classList.add('fixed-action-btn');
              wrapper.appendChild(btn);
              document.body.appendChild(wrapper);

              const message = document.createElement('div');

              const closeIcon = document.createElement('i');
              closeIcon.addEventListener('click', () => {
                message.classList.remove('active');
                btn.parentNode.classList.remove('hide');
              });
              closeIcon.classList.add('material-icons', 'close');
              closeIcon.innerText = 'close';

              message.appendChild(closeIcon);

              const title = document.createElement('h4');
              title.innerText = 'New content is available';
              message.appendChild(title);

              const content = document.createElement('p');
              content.innerText = 'Please refresh your browser';
              message.appendChild(content);
              message.classList.add('notice-card');

              const refresh = document.createElement('button');
              refresh.classList.add('btn', 'primary-text', 'secondary');
              refresh.innerText = 'Refresh';
              refresh.addEventListener('click', () => window.reload());
              message.appendChild(refresh);

              document.body.appendChild(message);

              btn.addEventListener('click', () => {
                message.classList.add('active');
                btn.parentNode.classList.add('hide');
              });
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
