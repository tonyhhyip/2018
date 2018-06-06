const path = require('path');
const fs = require('fs');
const express = require('express');
const { Environment, FileSystemLoader } = require('nunjucks');
const serveStatic = require('serve-static');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const chokidar = require('chokidar');
const devConfig = require('./webpack.dev.conf');
const config = require('../config');
const {
  loadAssets,
  loadData,
  topicSlug,
  topicURL,
} = require('./parameter');
const transformTopic = require('./transform');

const app = express();
const baseURL = process.env.BASE_URL || 'https://hkoscon.org/2018';
const fbAppID = process.env.FB_APP_ID || '';

/**
 * Setup Nunjucks Template engine
 */

const layoutsLoader = new FileSystemLoader('assets/layouts', { watch: true });
const pagesLoader = new FileSystemLoader('assets/pages', { watch: true });

const env = new Environment([pagesLoader, layoutsLoader]);
env.addFilter('topicSlug', topicSlug);
env.addFilter('topicURL', topicURL.bind(null, baseURL));

function TemplateEngine(name, options) {
  this.name = name;
  this.path = name;
  this.defaultEngine = options.defaultEngine;
  this.ext = path.extname(name);
  if (!this.ext) {
    this.ext = (this.defaultEngine[0] !== '.' ? '.' : '') + this.defaultEngine;
    this.name += this.ext;
  }
}

TemplateEngine.prototype.render = function render(opts, cb) {
  env.render(this.name, opts, cb);
};

app.set('views', './assets/pages');
app.set('view', TemplateEngine);
app.set('nunjecksEnv', env);

/**
 * Setup Static Endpoint
 */
app.use('/2018/images', serveStatic('assets/images'));
app.use('/2018/data', serveStatic('assets/data'));
app.use('/2018', serveStatic('static'));

/**
 * Setup Webpack Middlewares
 */

const compiler = webpack(devConfig);
const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: devConfig.output.publicPath,
  logLevel: 'silent',
});
const hotMiddleware = webpackHotMiddleware(compiler, {
  log: () => {},
});

app.use(devMiddleware);
app.use(hotMiddleware);

devMiddleware.waitUntilValid(() => console.log('Server is Ready'));


/**
 * Setup Template rendering
 */

let data = {};
let assets = {};
let topics;

async function updateAssets() {
  assets = await loadAssets();
}

async function updateData() {
  data = await loadData({
    timetable: 'https://data.hkoscon.org/api/v1/days/HKOSCon%202018',
    general: 'https://data.hkoscon.org/api/v1/info/HKOSCon%202018',
  });
  topics = transformTopic(data.timetable);
}

(() => {
  updateAssets();
  updateData();
})();

const watcher = chokidar.watch('./assets/data/*.yml');
watcher.on('change', updateData);
watcher.on('add', updateData);
watcher.on('unlink', updateData);

chokidar.watch('./public/assets.json').on('change', updateAssets);

app.get('/2018/topic/:topic', (req, res, next) => {
  const id = req.params.topic;
  const pageURL = `${baseURL}/topic/${id}/`;
  env.render('topic.jinja', {
    assets,
    data,
    topic: topics.get(id),
    pageURL,
    fbAppID,
  }, (err, result) => {
    if (err) {
      next(err);
    } else {
      res.end(result);
    }
  });
});

app.get('/2018/*', (req, res) => {
  let url = req.path;
  if (!/\.html$/.test(url)) {
    if (url.endsWith('/')) {
      url += 'index.html';
    } else {
      res.redirect(`${url}/`);
      return;
    }
  }
  const file = url.replace(/html$/, 'jinja').replace(/^\/2018\//, '');
  if (fs.existsSync(`./assets/pages/${file}`)) {
    res.render(file, {
      data,
      assets,
      baseURL,
      fbAppID,
    });
  } else {
    res.status(404).end();
  }
});

app.get('/', (req, res) => {
  res.redirect('/2018/');
  res.end();
});

app.listen(config.dev.port);
