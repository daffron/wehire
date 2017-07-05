const path = require('path')
const LiveReloadPlugin = require('webpack-livereload-plugin')

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
    new LiveReloadPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map'
}
