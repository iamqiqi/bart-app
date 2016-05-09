var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var definePlugin = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
  __DEVTOOLS__: false,
});

module.exports = {
  entry: [
      './src/index.jsx',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'subclub-chat-client.js',
  },
  plugins: [
    definePlugin,
    new ExtractTextPlugin('[name]-[chunkhash].css', { allChunks: true }),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['jsx-loader?harmony', 'babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&sourceMap!postcss-loader!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true'),
      },
    ],
  },
  postcss: [
    autoprefixer({ browsers: ['last 2 versions'] }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
