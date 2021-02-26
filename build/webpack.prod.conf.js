const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const baseConfig = require('./webpack.base.conf.js')

module.exports = merge(baseConfig, {
  // devtool: 'source-map',
  output: {
    filename: '[name].[contenthash:8].js',
    chunkFilename: '[name].[contenthash:8].js'
  },
  plugins: [
    new CleanWebpackPlugin({ verbose: false, cleanStaleWebpackAssets: false })
  ],
  optimization: {
    minimize: true,
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`
    },
    splitChunks: {
      chunks: 'all',
      minSize: {
        javascript: 30000,
        style: 50000
      },
      maxSize: {
        javascript: 250000,
        style: 100000
      },
      maxAsyncRequests: 3,
      maxInitialRequests: 4,
      minRemainingSize: 0,
      minChunks: 1,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        common: {
          name: 'common',
          chunks: 'initial',
          minChunks: 2,
          minSize: 0
        },
        async: {
          name: 'async',
          chunks: 'async',
          minChunks: 2,
          minSize: 0,
          maxSize: {
            javascript: 250000,
            style: 100000
          }
        },
        npm: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          name: (normalModule, chunks, name) => {
            return name + '~' + chunks.map((chunk) => chunk.name).join('~')
          },
          priority: 1 << 1
        }
      }
    }
  }
})
