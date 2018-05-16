const fs = require('fs');
const axios = require('axios');
const webpack = require('webpack');
const shell = require('shelljs');
const path = require('path');
const glob = require('glob');
const { Environment, FileSystemLoader } = require('nunjucks');
const { minify } = require('html-minifier');
const config = require('./webpack.prod.conf');
const { loadData, loadAssets } = require('./parameter');

process.env.NODE_ENV = 'production';

const assetsPath = './public';

function buildAssets(apiURL) {
  // prepare assets directory
  shell.rm('-rf', assetsPath);
  shell.mkdir('-p', assetsPath);
  shell.config.silent = true;

  const promises = [
    new Promise((resolve, reject) => {
      webpack(config, (err, stats) => {
        if (err) {
          reject(err);
        } else {
          console.log(stats.toString({
            modules: true,
            children: true,
            chunks: true,
            chunkModules: true,
          }));
          resolve();
        }
      });
    }),
    new Promise((resolve, reject) => {
      axios(apiURL)
        .then((response) => {
          if (!fs.existsSync('public/data')) {
            fs.mkdirSync('public/data');
          }
          fs.writeFile(
            'public/data/timetable.json',
            JSON.stringify(response.data),
            (error) => {
              if (error === null) {
                resolve();
                return;
              }
              reject(error);
            },
          );
        })
        .catch(error => reject(error));
    }),
  ];

  return Promise.all(promises)
    .then(() => console.log('All assets are rendered.'))
    .catch(error => console.error(error));
}

function getPageFiles() {
  return new Promise((resolve, reject) => {
    glob('assets/pages/**/*.jinja', (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}

const minifyOption = {
  removeComments: true,
  minifyJS: true,
  collapseWhitespace: true,
  conservativeCollapse: true,
  html5: true,
};

function createRenderPagePromise(env, assets, data, file) {
  return new Promise((resolve, reject) => {
    const res = env.render(file.replace('assets/pages/', ''), { assets, data });
    const content = minify(res, minifyOption);
    const filepath = file.replace('jinja', 'html').replace('assets/pages', 'public');
    if (!fs.existsSync(filepath)) {
      const dirpath = path.dirname(filepath);
      if (!fs.existsSync(dirpath)) {
        fs.mkdirSync(dirpath);
      }
      if (!fs.lstatSync(dirpath).isDirectory()) {
        throw new Error(`path is not a directory: ${dirpath}`);
      }
    }
    fs.writeFile(filepath, content, 'utf-8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function buildPages(apiURL) {
  const layoutsLoader = new FileSystemLoader('assets/layouts');
  const pagesLoader = new FileSystemLoader('assets/pages');
  const env = new Environment([pagesLoader, layoutsLoader]);

  const files = await getPageFiles();
  const data = await loadData(apiURL);
  const assets = await loadAssets();
  const promises = files.map(createRenderPagePromise.bind(null, env, assets, data));

  return Promise.all(promises)
    .then(() => console.log('All pages is rendered'))
    .catch(error => console.error(error));
}

(async () => {
  const apiURL = 'https://hkoscon.ddns.net/api/v1/days/HKOSCon%202018';
  await buildAssets(apiURL);
  await buildPages(apiURL);
})();
