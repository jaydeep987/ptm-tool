const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const settings = require('./settings');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

function webpackConfig() {
  const entryPoints = [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${settings.options.host}:${settings.options.port}`,
    'webpack/hot/only-dev-server',
    settings.paths.clientIndexJs,
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
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'postcss-loader'],
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
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          loader: 'url-loader?limit=100000',
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
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          DEVAPIHOST: JSON.stringify(process.env.DEVAPIHOST),
          DEVAPIPORT: JSON.stringify(process.env.DEVAPIPORT),
          PTMAPIHOST: JSON.stringify(process.env.PTMAPIHOST),
          PTMAPIPORT: JSON.stringify(process.env.PTMAPIPORT),
          JIRAAPIHOST: JSON.stringify(process.env.JIRAAPIHOST),
          JIRAAPIPORT: JSON.stringify(process.env.JIRAAPIPORT),
          PTM_JIRA_API: JSON.stringify(process.env.PTM_JIRA_API),
        },
      }),
      // HTML Generator
      new HtmlWebpackPlugin({
        template: settings.paths.htmlTemplate,
        title: settings.packageJson.name,
      }),

      new ExtractTextPlugin('[name].css'),

      new CaseSensitivePathsPlugin(),
    ],

    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      modules: [
        __dirname,
        settings.paths.nodeModules,
      ],
    }, // resolve
    node: {
      fs: 'empty',
      child_process: 'empty',
    }, // node
  };

  return config;
}

module.exports = webpackConfig;
