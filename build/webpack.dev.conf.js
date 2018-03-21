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
  mode: 'development',
  entry: {
    app: ['./build/dev-client.js'],
  },
  module: {
    rules: utils.styleLoaders({ sourceMap: true }),
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
