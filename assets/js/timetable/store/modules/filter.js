export default {
  namespaced: true,
  state: {
    level: [],
  },
  mutations: {
    setLevel(state, level) {
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
      commit('setLevel', [level].concat(state.level || []));
    },
    removeLevel({ commit, state }, level) {
      commit('setLevel', (state.level || []).filter(l => l !== level));
    },
    clearLevel({ commit }) {
      commit('setLevel', []);
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
