// using old way of import modules using require, 
// because ecmascript import can't be used inside configuration files.
const path = require('path');  
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const babelOptions = {
  presets: [ '@babel/env' ],
  // plugins: [ '@babel/plugin-proposal-class-properties' ]
};

module.exports = {
  entry: {
    index: './src/index.ts',      // The entry key is by default main which can be changed to anything required
  },
  output: {
    filename: '[name].[contenthash:8].js',                // output filenames taken from the entry point chunks
    path: path.resolve(__dirname, '../dist'),             // __dirname is the project directory
    // publicPath: ''                                        // The path from which assets or scripts will be loaded from
  },
  // Generates multiple dependency vendor files
  // optimization: {                                      // For extracting common dependencies into a separate js file. 
  //   runtimeChunk: 'single',
  //   splitChunks: {
  //     chunks: 'all',
  //     maxInitialRequests: Infinity,
  //     minSize: 10000,
  //     cacheGroups: {                                   
  //       vendor: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name(module) {
  //           // get the name. E.g. node_modules/packageName/not/this/part.js
  //           // or node_modules/packageName
  //           const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

  //           // npm package names are URL-safe, but some servers don't like @ symbols
  //           return `npm.${packageName.replace('@', '')}`;
  //         },
  //       },
  //     },
  //   },
  // },

  // Generates single dependency vendor file
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {                                                
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          filename: '[name].bundle.js'
        }
      }
    }
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions
          },
          {
            loader: 'ts-loader'
          } 
        ]                              
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions
          }
        ]
      }, 
      {
        test: /\.(png|jpg|ttf|otf)$/,
        type: 'asset/resource',                                  // can be asset/resource, asset/inline, asset or asset/source
        // parser: {
        //   dataUrlCondition: {
        //     maxSize: 0.5 * 1023                         // to change the maxsize of the asset to be inlined
        //   }
        // }
      }, 
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
        ]
      },
      {
        test: /\.hbs$/,
        use: [
          'handlebars-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',                           // multiple css generated based on their chunk name

    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'Road Connect',
      template: 'src/shared/index-template.hbs',
      templateParameters: {
        heading: ''
      }
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/*',                                         // The default - relative to the path specified in output property
        // path.join(process.cwd(), 'additional_dir_contents_to_be_removed/**/*')   // process.cwd() current working directory
      ]
    }),
    new CopyPlugin({                                    // Works perfectly with the hot reload feature. Automatically replaces any files modified in the 'from' folder when server is running  
      patterns: [
        { from: path.resolve(__dirname, '../src/game/src/assets'), to: path.resolve(__dirname, '../dist/game/src/assets') },
      ],
    }),
  ]
}