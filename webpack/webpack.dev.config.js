const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.config')

const dev = {
  mode: 'development',                                    // environment - 'development' | 'production' | 'none'
  devtool: 'eval-source-map',                       // used for sourceMaps - few available options - false | 'eval' - default | 'eval-cheap-source-map' | 'eval-source-map'  
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    open: true,                                           // To open the default browser
    // openPage: 'altFolder/index.html',
    index: 'index.html',                                  // entering localhost:9000 is enough to load the specified file. Instead of localhost:9000/index.html
    port: 9000,
    // writeToDisk: true                                     // if false will load from memory instead of ./dist
  }
}

module.exports = merge(common, dev);