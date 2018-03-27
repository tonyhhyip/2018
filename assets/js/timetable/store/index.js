import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import state from './state';
import mutations from './mustations';
import actions from './actions';
import filter from './modules/filter';

Vue.use(Vuex);

export default function createStore() {
  return new Store({
    state,
    mutations,
    actions,
    modules: {
      filter,
    },
  });
}
