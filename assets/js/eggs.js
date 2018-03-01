import * as pwa from './easterEggs/pwa';

[pwa].forEach((egg) => {
  if (egg.match()) {
    egg.add();
  }
});
