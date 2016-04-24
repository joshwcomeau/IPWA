var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');


module.exports = {
  devtool: 'eval',

  entry: [
    'webpack-hot-middleware/client',
    './client/index.jsx'
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV:       JSON.stringify('development')
      }
    })
  ],

  module: {
    loaders: [
      // JAVASCRIPT
      {
        test:     /\.jsx?$/,
        loaders:  ['react-hot', 'babel'],
        exclude:  /node_modules/,
        include:  /client/
      },
      // SASS
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'postcss', 'sass']
      }
    ]
  },

  postcss: function () {
    return [autoprefixer];
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.sass'],
    modulesDirectories: ['node_modules', 'client']
  }
}
