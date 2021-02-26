const { merge } = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.base.conf')
const config = require('../config')
const { resolve } = require('./utils')

module.exports = merge(baseConfig, {
  devtool: 'eval-cheap-module-source-map', // 相比’source-map‘性能更好
  optimization: {
    emitOnErrors: true,
  },
  devServer: {
    port: process.env.PORT || config[process.env.NODE_ENV].port,
    open: true,
    hot: true,
    contentBase: resolve('dist')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})
