require('dotenv').load()
const path = require('path')
const LiveReloadPlugin = require('webpack-livereload-plugin')
const webpack = require('webpack')

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: /\.jsx?$/,
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new LiveReloadPlugin(),
    new webpack.EnvironmentPlugin({
      PRESET: process.env.PRESET,
      AUTH: process.env.AUTH
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    hot: true
  }
}
