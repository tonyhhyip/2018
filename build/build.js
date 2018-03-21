const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const shell = require('shelljs');
const glob = require('glob');
const { Environment, FileSystemLoader } = require('nunjucks');
const { minify } = require('html-minifier');
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
    shell.mkdir('-p', path.dirname(filepath));
    fs.writeFile(filepath, content, 'utf-8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function buildPages() {
  const layoutsLoader = new FileSystemLoader('assets/layouts');
  const pagesLoader = new FileSystemLoader('assets/pages');
  const env = new Environment([pagesLoader, layoutsLoader]);

  const files = await getPageFiles();
  const data = await loadData();
  const assets = await loadAssets();
  const promises = files.map(createRenderPagePromise.bind(null, env, assets, data));

  return Promise.all(promises)
    .then(() => console.log('All pages is rendered'))
    .catch(console.error);
}


(async () => {
  await buildAssets();
  await buildPages();
})();
