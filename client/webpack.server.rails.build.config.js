// Common webpack configuration for server bundle
/* eslint-env node */

const webpack = require('webpack')
const path = require('path')

// eslint-disable-next-line no-process-env
const devBuild = process.env.NODE_ENV !== 'production'
const nodeEnv = devBuild ? 'development' : 'production'

module.exports = {
  context: __dirname,
  entry: [
    'babel-polyfill',
    './app/bundles/businesshack_editor/startup/server_registration',
    './app/bundles/businesshack_comments/startup/server_registration',
    './app/legacy/server_registration',
  ],
  output: {
    filename: 'server-bundle.js',
    path: '../app/assets/webpack',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      shared: path.join(process.cwd(), 'app', 'shared'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    }),
  ],
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.css$/,
        loaders: [
          'css/locals?modules&importLoaders=0&localIdentName=[name]__[local]__[hash:base64:5]',
        ],
      },
      {
        test: /\.s[ca]ss$/,
        loaders: [
          'css/locals?modules&importLoaders=2&localIdentName=[name]__[local]__[hash:base64:5]',
          'sass',
          'sass-resources',
        ],
      },
    ],
  },
  sassLoader: {
    indentedSyntax: true,
  },
  sassResources: ['./app/assets/styles/app-variables.sass'],
}
