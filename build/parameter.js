const fs = require('fs');
const axios = require('axios');
const path = require('path');
const glob = require('glob');
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
  for (let key in apiURLs) {
    promises.push(new Promise((resolve, reject) => {
      axios.get(apiURLs[key])
        .then((response) => {
          resolve({
            key: key,
            value: response.data,
          });
        })
        .catch(error => reject(error));
    }));
  }

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

exports.loadData = loadData;
exports.loadAssets = loadAssets;
