const webpack = require('webpack')
const config = require('./webpack.prod.conf.js')
require('colors')

const log = console.log

log('####开始构建####'.yellow)
webpack(config, (err, status) => {
  if (err) log(err)
  log(status.toString());
  log('####构建结束####'.green)
})
