import createTimetable from './table';
import createModal from './modal';
import createStore from './store';

const store = createStore();
const timetable = createTimetable(store);
timetable.$mount('#schedule');

const modal = createModal(store);
modal.$mount('#modal');
/* globals window, FB */
window.fbAsyncInit = function () {
  FB.init({
    appId: process.env.FB_APP_ID,
    autoLogAppEvents: true,
    xfbml: true,
    version: 'v3.0',
  });
};
