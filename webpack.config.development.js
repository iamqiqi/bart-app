var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');

var PORT = process.env.PORT || '7000';
var HOSTNAME = process.env.C9_HOSTNAME || 'localhost';

var definePlugin = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  __DEVTOOLS__: true,
});

module.exports = {
  devtool: 'eval',
  entry: [
      'webpack-dev-server/client?http://' + HOSTNAME + ':' + PORT,
      'webpack/hot/only-dev-server',
      './src/index.jsx',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'http://' + HOSTNAME + ':' + PORT + '/dev/',
  },
  plugins: [
      definePlugin,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'jsx-loader?harmony', 'babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loader: 'style!css?-modules&importLoaders=2&sourceMap&-localIdentName=[path][name]___[local]___[hash:base64:5]!postcss-loader!sass?outputStyle=expanded&sourceMap',
      },
    ],
  },
  postcss: [
    autoprefixer({ browsers: ['last 2 versions'] }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'redux-devtools': path.join(__dirname, 'node_modules', 'redux-devtools'),
    },
  },
};
