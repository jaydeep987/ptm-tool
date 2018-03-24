const settings = require('./settings');
const webpack = require('webpack');
// const UglifyJsPlugin = require('webpack-uglify-js-plugin');
const path = require('path');
const UglifyJsPlugin = require('webpack-uglify-js-plugin');
const vendorLibraryName = '[name]';

module.exports = {
  context: __dirname,
  devtool: 'inline-source-map',
  entry: {
    vendor: settings.vendor,
  },
  output: {
    filename: `vendor-${settings.packageJson.version}.min.js`,
    path: settings.paths.clientBuild,
    library: vendorLibraryName,
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader', options: { cacheDirectory: true } },
        ],
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        include: settings.paths.clientSrc,
        use: 'file-loader',
      },
      {
        test: /\.theme\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIndentName: '[name]--[local]--[hash:base64:8]',
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.css$/,
        exclude: /\.theme\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
          },
          'postcss-loader', // has separate config, see postcss.config.js nearby
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
          },
        }],
      },
    ],
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cacheFolder: true,
        uglifyOptions: {
          beatify: false,
          comments: false,
          sourcemap: false,
          compress: {
            screw_ie8: true,
            warnings: false,
          },
          output: {
            screw_ie8: true,
            comments: false,
          },
        },
      }),
    ],
  },

  resolve: {
    // alias/shortcuts when importing packages
    // alias: settings.alias,
    // Supported extensions
    extensions: ['.js', '.jsx'],
  },

  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),

    new webpack.optimize.OccurrenceOrderPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),

    new webpack.DllPlugin({
      name: vendorLibraryName,
      path: settings.paths.manifest,
    }),
  ],
};
