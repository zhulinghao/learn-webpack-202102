const webpack = require('webpack')
require('colors')
const open = require('open')

const webpackDevConfig = require('./webpack.dev.conf.js')
const config = require('../config')
const WebpackDevServer = require('webpack-dev-server')
const { resolve } = require('./utils.js')

const compiler = webpack(webpackDevConfig)
const devServerOptions = Object.assign({}, {
  after () { },
  compress: true,
  headers: {
    'X-Custom-Foo': 'bar'
  },
  hot: true,
  hotOnly: true,
  stats: {
    colors: true,
  },
  contentBase: resolve('dist')
})
const server = new WebpackDevServer(compiler, devServerOptions)
const port = process.env.PORT || config[process.env.NODE_ENV].port

server.listen(port, '127.0.0.1', (err) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(`> 开启开发服务器, 端口${port}`.yellow.bgCyan)
  open(`http://127.0.0.1:${port}`)
})
