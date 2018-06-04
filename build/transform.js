const { topicSlug } = require('./parameter');

function transformTopics(timetable) {
  const map = new Map();
  timetable.days.forEach(({ day, date, timeslots }) => {
    timeslots.forEach(({ startTime, endTime, events }) => {
      events.forEach((e) => {
        if (!e.topic) return;
        map.set(topicSlug(e), {
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
}

module.exports = transformTopics;
