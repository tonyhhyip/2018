const SET_EVENT = 'SET_EVENT';
const TOGGLE_MODAL = 'TOGGLE_MODAL';

const event = {
  day: 0,
  startTime: '00:00',
  endTime: '00:00',
  display: '',
  language: '',
  level: '',
  speaker: {
    name: '',
    country: null,
    community: null,
  },
  topic: false,
  venue: {
    name: '',
  },
};

export default {
  namespaced: true,
  state: {
    event,
    open: false,
  },
  mutations: {
    [SET_EVENT](state, e) {
      state.event = e;
    },
    [TOGGLE_MODAL](state) {
      state.open = !state.open;
    },
  },
  actions: {
    openModal({ commit }, e) {
      commit(SET_EVENT, e);
      commit(TOGGLE_MODAL);
    },
    closeModal({ commit }) {
      commit(SET_EVENT, event);
      commit(TOGGLE_MODAL);
    },
  },
};
