import axios from 'axios';
import yaml from 'js-yaml';
import Vue from 'vue';
import Vuex, { Store } from 'vuex';

Vue.use(Vuex);

export default function createStore() {
  return new Store({
    state: {
      days: null,
      ready: false,
    },
    mutations: {
      setReady(state, done) {
        state.ready = done;
      },
      importDays(state, days) {
        state.days = days;
      },
    },
    actions: {
      loadFromRemote({ commit }) {
        axios.get('/2018/data/timetable.yml')
          .then(({ data }) => yaml.safeLoad(data))
          .then((data) => {
            console.log(data);
            commit('importDays', data.days);
            commit('setReady', true);
          });
      },
    },
  });
}
