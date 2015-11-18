// Common webpack configuration used by webpack.hot.config and webpack.rails.config.

const webpack = require('webpack');

module.exports = {
  // the project dir
  context: __dirname,
  entry: {
    vendor: [
      'babel-core/polyfill',
      'jquery',
      'jquery-ujs',
      'react',
      'react-dom'
    ],
    app: []
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.sass', '.scss', '.css', 'config.js'],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor-bundle.js',
      minChunks: Infinity,
    }),
  ],
  module: {
    loaders: [
      // React is necessary for the client rendering:
      {test: require.resolve('react'), loader: 'expose?React'},
      {test: require.resolve('react-dom'), loader: 'expose?ReactDOM'},
      {test: require.resolve('jquery'), loader: 'expose?jQuery'},
      {test: require.resolve('jquery'), loader: 'expose?$'}
    ],
  },
};
