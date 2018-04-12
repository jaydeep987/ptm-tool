const ExtractTextPlugin = require('extract-text-webpack-plugin');
const settings = require('./settings');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const merge = require('merge');
const baseConfig = require('./webpack.config.base.js');
const { ReactLoadablePlugin } = require('react-loadable/webpack');

function webpackConfig() {
  const entryPoints = [
    settings.paths.clientIndexJs,
  ];

  const config = {
    entry: {
      main: entryPoints,
    },
    output: {
      filename: settings.options.fileName,
      /* Path to output file name */
      path: settings.paths.clientBuild,
      /* Required for Hot Module Reloader to know where to load hot update chunks */
      publicPath: settings.paths.publicPath,
    },
    devtool: 'eval-source-map',

    plugins: [
      // Prints readbale module names in the browser console
      new webpack.NamedModulesPlugin(),

      new ReactLoadablePlugin({
        filename: settings.paths.reactLoadableFile,
      }),

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

      new CaseSensitivePathsPlugin(),

      new ExtractTextPlugin(settings.options.cssBundleFileName),
    ],

    node: {
      fs: 'empty',
      child_process: 'empty',
    }, // node
  };

  return merge(baseConfig, config);
}

module.exports = webpackConfig;
