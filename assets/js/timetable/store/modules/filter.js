const SET_LEVEL = 'SET_LEVEL';

export default {
  namespaced: true,
  state: {
    level: [],
  },
  mutations: {
    [SET_LEVEL](state, level) {
      state.level = level;
    },
  },
  getters: {
    activeLevels({ level }) {
      return level;
    },
  },
  actions: {
    addLevel({ commit, state }, level) {
      commit(SET_LEVEL, [level].concat(state.level || []));
    },
    removeLevel({ commit, state }, level) {
      commit(SET_LEVEL, (state.level || []).filter(l => l !== level));
    },
    clearLevel({ commit }) {
      commit(SET_LEVEL, []);
    },
    toggleLevel({ dispatch, state }, level) {
      if (state.level.indexOf(level) !== -1) {
        dispatch('removeLevel', level);
      } else {
        dispatch('addLevel', level);
      }
    },
  },
};
