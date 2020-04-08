const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
require('dotenv').config();
const { NODE_ENV, CI } = process.env;

module.exports = {
  watch: !CI && NODE_ENV !== 'production',
  mode: NODE_ENV,
  devtool: CI || NODE_ENV === 'production' ? 'source-map' : 'inline-source-map',
  entry: './src/index.tsx',
  output: {
    filename: 'dist.js',
    path: path.resolve(__dirname, 'www/js'),
    publicPath: '/js/',
    chunkFilename: '[id].[name][chunkhash].js',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: '../index.html',
      title: 'Epic Website',
      // favicon: './src/images/favicon.ico',
      template: './src/views/template.ejs'
    }),
    new webpack.DefinePlugin({ env: { NODE_ENV: `"${NODE_ENV}"` } })
  ],
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.less$|\.css$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
          },
        ]
      },
      {
        test: /\.(gif|jpe?g|webp|png)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                enabled: false
              },
              optipng: {
                enabled: false
              },
              pngquant: {
                enabled: false
              }
            }
          },
        ],
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.png', '.jpg', '.webp'],
    alias: {
      Images: path.resolve(__dirname, 'src/images'),
      Clients: path.resolve(__dirname, 'src/clients'),
    }
  },
  devServer: {
    port: 9000,
    contentBase: 'www',
    hot: true,
    disableHostCheck: true,
    historyApiFallback: {
      index: 'index.html'
    },
    compress: true
  }
};
