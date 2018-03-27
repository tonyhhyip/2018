import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import state from './state';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

import filter from './modules/filter';
import modal from './modules/modal';

Vue.use(Vuex);

export default function createStore() {
  return new Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
      filter,
      modal,
    },
  });
}
