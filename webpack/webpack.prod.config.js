const { merge } = require('webpack-merge')
const common = require('./webpack.common.config')

const prod = {
  mode: 'production',                                // environment - 'development' | 'production' | 'none'
  optimization: {                                     // For extracting common dependencies into a separate js file.
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 10000,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  }  
}

module.exports = merge(common, prod);