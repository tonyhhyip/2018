import axios from 'axios';

export default {
  loadFromRemote({ commit }) {
    axios.get(process.env.TIMETABLE_API_URL)
      .then(({ data }) => {
        commit('importDays', data.days);
        commit('setReady', true);
      });
  },
};
