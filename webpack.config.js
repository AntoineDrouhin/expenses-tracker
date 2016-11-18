const webpack = require('webpack');

module.exports = {
  entry:
    './js/index.js'
  ,
  output: {
    filename: 'bundle.js',
    path:  './build',
    publicpath: './build'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.css$/, loader: "style!css" }
    ]
  }};
