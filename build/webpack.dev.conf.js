const path = require('path');
const merge = require('webpack-merge');
const { HotModuleReplacementPlugin, NoEmitOnErrorsPlugin, DefinePlugin } = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const AssetsWebpackPlugin = require('assets-webpack-plugin');
const WebpackDashboard = require('webpack-dashboard/plugin');
const baseConfig = require('./webpack.base.conf');
const utils = require('./utils');
const config = require('../config');

module.exports = merge.smart(baseConfig, {
  entry: {
    app: ['./build/dev-client.js'],
    timetable: ['./build/dev-client.js'],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: utils.cssLoaders({
            sourceMap: true,
            extract: false,
          }),
          transformToRequire: {
            video: 'src',
            source: 'src',
            img: 'src',
            image: 'xlink:href',
          },
        },
      },
      ...utils.styleLoaders({ sourceMap: true }),
    ],
  },
  plugins: [
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new HotModuleReplacementPlugin(),
    new NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin(),
    new DefinePlugin({
      'process.env': config.dev.env,
    }),
    new AssetsWebpackPlugin({
      filename: 'assets.json',
      path: path.join(process.cwd(), 'public'),
      prettyPrint: true,
    }),
    new WebpackDashboard(),
  ],
});
