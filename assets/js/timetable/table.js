import Vue from 'vue';
import Timetable from './Timetable.vue';

export default function createTimetable(store) {
  return new Vue({
    store,
    render: h => h(Timetable),
  });
}
