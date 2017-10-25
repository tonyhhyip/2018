const fs = require('fs');
const webpack = require('webpack');
const shell = require('shelljs');
const glob = require('glob');
const { Environment, FileSystemLoader } = require('nunjucks');
const config = require('./webpack.prod.conf');
const { loadData, loadAssets } = require('./parameter');

process.env.NODE_ENV = 'production';

const assetsPath = './public';

function buildAssets() {
  return new Promise((resolve, reject) => {
    shell.rm('-rf', assetsPath);
    shell.mkdir('-p', assetsPath);
    shell.config.silent = true;

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
  });
}

async function buildPages() {
  const data = await loadData();
  const assets = await loadAssets();

  const layoutsLoader = new FileSystemLoader('assets/layouts');
  const pagesLoader = new FileSystemLoader('assets/pages');

  const env = new Environment([pagesLoader, layoutsLoader]);
  return new Promise((resolve, reject) => {
    glob('assets/pages/**/*.jinja', (err, files) => {
      if (err) {
        reject(err);
        return;
      }
      const promises = files.map(file => new Promise((resolve, reject) => {
        const res = env.render(file.replace('assets/pages/', ''), { assets, data });
        fs.writeFile(file.replace('jinja', 'html').replace('assets/pages', 'public'), res, 'UTF-8', (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }));

      Promise.all(promises)
        .then(() => console.log('All pages is rendered'))
        .then(resolve)
        .catch(reject);
    });
  });
}

(async function () {
  await buildAssets();
  await buildPages();
}());
