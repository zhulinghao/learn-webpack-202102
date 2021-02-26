const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV !== 'development'

exports.resolve = dir => path.join(__dirname, '..', dir)

// loaders
const cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: true
  }
}

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: true
  }
}

exports.cssLoaders = () => {
  const mp = new Map()
  const generateLoader = (loaderName, vue) => {
    const loaders = [
      cssLoader,
      postcssLoader
    ]
    if (loaderName) {
      loaders.push({
        loader: `${loaderName}-loader`
      })
    }
    if (isProd) {
      loaders.unshift(MiniCssExtractPlugin.loader)
    } else {
      loaders.unshift('style-loader')
    }
    return loaders
  }

  mp.set(/\.css$/, generateLoader())
  mp.set(/\.styl(us)?$/, generateLoader('stylus'))
  return mp
}

exports.cssOptions = () => {
  const plugin = new MiniCssExtractPlugin({
    filename: '[name].[contenthash:8].css'
  })
  const loaders = []
  this.cssLoaders().forEach((use, test) => {
    loaders.push({ test, use, exclude: /node_modules/ })
  })

  return {
    loaders,
    plugin
  }
}

exports.imageLoader = () => {
  const contentHash = isProd ? '.[contenthash:8]' : ''
  return {
    test: /\.(png|jpe?g|gif|svg)$/i,
    include: /src/,
    type: 'asset',
    generator: {
      filename: `image/[name]${contentHash}[ext][query]`
    },
    parser: {
      dataUrlCondition: {
        maxSize: 8 * 1024 // 4kb
      }
    },
    use: [
      {
        loader: 'image-webpack-loader',
        options: {
          mozjpeg: {
            progressive: true,
            quality: 65
          },
          // optipng.enabled: false will disable optipng
          optipng: {
            enabled: false
          },
          pngquant: {
            quality: [0.65, 0.90],
            speed: 4
          },
          gifsicle: {
            interlaced: false
          },
          // the webp option will enable WEBP
          webp: {
            quality: 75
          }
        }
      }
    ]
  }
}
