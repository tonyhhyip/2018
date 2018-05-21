const { URL } = require('url');
const path = require('path');

module.exports = function ({ timetable }) {
  const map = new Map();
  timetable.days.forEach(({ day, date, timeslots }) => {
    timeslots.forEach(({ startTime, endTime, events }) => {
      events.forEach((e) => {
        if (!e.topic) return;
        const u = new URL(e.internal);
        const id = path.basename(u.pathname);
        map.set(id, {
          day,
          date,
          startTime,
          endTime,
          ...e,
        });
      });
    });
  });

  return map;
};
