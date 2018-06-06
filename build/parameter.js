const fs = require('fs');
const axios = require('axios');
const path = require('path');
const glob = require('glob');
const { URL } = require('url');
const yaml = require('js-yaml');

const assetsPath = './public';

function globData() {
  return new Promise((resolve, reject) => {
    glob('assets/data/*.yml', (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}

async function loadData(apiURLs) {
  const files = await globData();
  const promises = files.map(file => new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          key: path.basename(file, '.yml'),
          value: yaml.safeLoad(data),
        });
      }
    });
  }));

  // further information from API calls
  promises.push(...Object.keys(apiURLs).map((key) => {
    const apiURL = apiURLs[key];
    return new Promise((resolve, reject) => {
      axios.get(apiURL)
        .then((response) => {
          resolve({
            key,
            value: response.data,
          });
        })
        .catch(error => reject(error));
    });
  }));

  return Promise.all(promises)
    .then(pairs => pairs.reduce((obj, pair) => {
      obj[pair.key] = pair.value;
      return obj;
    }, {}));
}

function loadAssets() {
  return new Promise((resolve, reject) => {
    fs.readFile(`${assetsPath}/assets.json`, 'UTF-8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      const assets = JSON.parse(data);
      const scripts = Object.keys(assets).reduce((obj, key) => {
        obj[key] = assets[key].js;
        return obj;
      }, {});
      const styles = Object.keys(assets).reduce((obj, key) => {
        if ('css' in assets[key]) {
          obj[key] = assets[key].css;
        }
        return obj;
      }, {});
      resolve({ scripts, styles });
    });
  });
}

/**
 * topicSlug
 * Generates the slug string of a given topic object.
 * @param {Object} topic The topic object as retrieved from API.
 * @return {string} The normalized slug string of the topic.
 */
function topicSlug(topic) {
  if (typeof topic !== 'object') return '';
  if (typeof topic.internal !== 'string') return topic.replace(/[^_\W]+/g, '', '').replace(' ', '-').toLowerCase();
  const u = new URL(topic.internal);
  return path.basename(u.pathname);
}

/**
 * topicURL
 * Generates the topic's URL by given slug.
 * @param {string} baseURL The base URL of site without trailing slash
 * @param {string} slug The slug string of the topic.
 * @return {string} The full topic URL of the topic.
 */
function topicURL(baseURL, slug) {
  return `${baseURL}/topic/${slug}/`;
}

exports.loadData = loadData;
exports.loadAssets = loadAssets;
exports.topicSlug = topicSlug;
exports.topicURL = topicURL;
