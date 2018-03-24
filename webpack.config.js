const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const settings = require('./webpack/settings');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function webpackConfig(env) {
  const entryPoints = [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${settings.options.host}:${settings.options.port}`,
    'webpack/hot/only-dev-server',
    './client/index.tsx',
  ];

  const config = {
    entry: entryPoints,
    output: {
      filename: settings.options.fileName,
      /* Path to output file name */
      path: settings.paths.clientBuild,
      /* Required for Hot Module Reloader to know where to load hot update chunks */
      publicPath: settings.paths.publicPath,
    },
    devtool: 'eval-source-map',
    devServer: {
      hot: true,
      port: settings.options.port,
      // Match the output.path
      contentBase: settings.paths.clientBuild,
      publicPath: settings.paths.publicPath,
      disableHostCheck: true,
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
        },
        {
          enforce: 'pre',
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'tslint-loader',
          options: {
            configFile: 'tslint.json',
            emitErrors: true,
          },
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            { loader: 'babel-loader' },
            { loader: 'ts-loader' },
          ],
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [
            { loader: 'babel-loader', options: { cacheDirectory: true } },
          ],
        },
        {
          test: /\.(css|scss|sass)$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'postcss-loader', 'sass-loader'],
          }),
        },
        {
          test: /\.(png|jpg|gif|webp)$/,
          exclude: /node_modules/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              context: '', // TODO: SET CONTEXT
              outputPath: 'img/',
            },
          }],
        },
      ],
    }, // module

    plugins: [
      // Enable HMR globally
      new webpack.HotModuleReplacementPlugin(),
      // Prints readbale module names in the browser console
      new webpack.NamedModulesPlugin(),
      // Define client-side env variable
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
        },
      }),
      // HTML Generator
      new HtmlWebpackPlugin({
        template: settings.paths.htmlTemplate,
        title: settings.packageJson.name,
        vendorSrc: `vendor-${settings.packageJson.version}.min.js`,
      }),
    ],

    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      modules: [
        __dirname,
        path.resolve(__dirname, './node_modules'),
      ],
    }, // resolve
    node: {
      fs: 'empty',
      child_process: 'empty',
    }, // node
  };

  if (!settings.checks.vendorExists) {
    console.warn('No vender bundle found..');
  } else {
    config.plugins.push(new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(settings.paths.manifest),
    }));
  }

  return config;
}

module.exports = webpackConfig;
