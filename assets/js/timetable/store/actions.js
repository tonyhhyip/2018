import axios from 'axios';

export default {
  loadFromRemote({ commit }) {
    axios.get('/2018/data/timetable.json')
      .then(({ data }) => {
        commit('importDays', data.days);
        commit('setReady', true);
      });
  },
};
