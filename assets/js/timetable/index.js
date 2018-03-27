import createTimetable from './table';
import createModal from './modal';
import createStore from './store';

const store = createStore();
const timetable = createTimetable(store);
timetable.$mount('#schedule');

const modal = createModal(store);
modal.$mount('#modal');
