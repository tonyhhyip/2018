import Vue from 'vue';
import Timetable from './Timetable.vue';
import createStore from './store';

export default function createApp() {
  const store = createStore();
  return new Vue({
    store,
    render: h => h(Timetable),
  });
}
