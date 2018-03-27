import createTimetable from './table';
import createStore from './store';

const store = createStore();
const timetable = createTimetable(store);
timetable.$mount('#schedule');
