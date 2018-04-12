const ExtractTextPlugin = require('extract-text-webpack-plugin');
const settings = require('./settings');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const merge = require('merge');
const baseConfig = require('./webpack.config.base.js');

function webpackConfig() {
  const entryPoints = [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${settings.options.host}:${settings.options.port}`,
    'webpack/hot/only-dev-server',
    settings.paths.clientIndexJs,
  ];

  const config = {
    entry: {
      main: entryPoints,
      vendor: settings.vendor,
    },
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

      new CaseSensitivePathsPlugin(),

      new ExtractTextPlugin(settings.options.cssBundleFileName),
    ],

    optimization: {
      occurrenceOrder: true,
      splitChunks: {
        cacheGroups: {
          main: {
            name: 'main',
            chunks: 'async',
            minChunks: 2,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
            minChunks: 2,
          },
        },
      },
    },

    node: {
      fs: 'empty',
      child_process: 'empty',
    }, // node
  };

  return merge(baseConfig, config);
}

module.exports = webpackConfig;
