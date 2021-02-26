const { resolve, cssOptions, imageLoader } = require('./utils')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const isProd = process.env.NODE_ENV !== 'development'
const _cssOptions = cssOptions()

console.log(_cssOptions.loaders);

const baseConfig = {
  // target: isProd ? 'node' : 'web',
  target: 'web',
  mode: process.env.NODE_ENV,
  // entry: {
  //   main: resolve('src/main.js'),
  //   module1: resolve('src/module1.js')
  // },
  // entry: [ resolve('src/main.js'), resolve('src/module1.js') ],
  entry: resolve('src/main.js'),
  output: {
    filename: '[name].js',
    path: resolve('./dist')
  },
  resolve: {
    // Webpack 会自动带上后缀后去尝试访问文件是否存在, 默认 ['.js', '.json']
    extensions: ['.js', '.json'],
    alias: {
      '@': resolve('src'),
      style: resolve('src/style'),
      js: resolve('src/js'),
      components: resolve('src/components')
    }
  },
  module: {
    rules: [
      // {
      //   test: /\.pug$/,
      //   oneOf: [
      //     // 这条规则应用到 Vue 组件内的 `<template lang="pug">`
      //     {
      //       resourceQuery: /^\?vue/,
      //       use: ['pug-plain-loader']
      //     },
      //     // 这条规则应用到 JavaScript 内的 pug 导入
      //     {
      //       use: ['raw-loader', 'pug-plain-loader']
      //     }
      //   ]
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: [
          'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ],
        include: /src/
      },
      ..._cssOptions.loaders,
      imageLoader()
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      title: 'this is index'
    }),
    new VueLoaderPlugin()
  ]
}

isProd && baseConfig.plugins.push(_cssOptions.plugin)

module.exports = baseConfig