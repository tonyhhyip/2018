const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  TIMETABLE_API_URL: JSON.stringify('https://hkoscon.ddns.net/api/v1/days/HKOSCon%202018'),
});
