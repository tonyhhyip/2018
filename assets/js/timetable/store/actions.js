import axios from 'axios';
import yaml from 'js-yaml';

export default {
  loadFromRemote({ commit }) {
    axios.get('/2018/data/timetable.yml')
      .then(({ data }) => yaml.safeLoad(data))
      .then((data) => {
        commit('importDays', data.days);
        commit('setReady', true);
      });
  },
};
