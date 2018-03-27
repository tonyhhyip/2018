export default {
  setReady(state, done) {
    state.ready = done;
  },
  importDays(state, days) {
    state.days = days;
  },
};
