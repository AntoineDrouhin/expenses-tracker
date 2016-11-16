
module.exports = {
  entry: './js/index.js',
  output: {
    filename: 'bundle.js',
    path: './built/'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }};
