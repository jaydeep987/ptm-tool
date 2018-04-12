const path = require('path');
const fs = require('fs');
const packageJson = require('../package.json');

const rootDir = fs.realpathSync(process.cwd());
const clientSrcDir = 'client';
const apiSrcDir = 'api';
const clientBuild = 'static';
const apiBuild = 'api_build';
const htmlTemplate = `${clientSrcDir}/public/index.html`;
const clientStyles = `${clientSrcDir}/assets/styles`;
const clientVendorManifest = `${clientBuild}/vendor.manifest.json`;
const clientIndexJs = `${clientSrcDir}/index.tsx`;
const nodeModules = `${rootDir}/node_modules`;
const favicon = `${rootDir}/favicon.ico`;
const reactLoadableFile = `${clientBuild}/react-loadable.json`;

function absPath(realPath) {
  return path.resolve(rootDir, realPath);
}

function getFileName() {
  const name = packageJson.name || '[name]';
  const version = packageJson.version || '';
  return version !== '' ? `${name}-${version}` : name;
}

const options = {
  fileName: `${getFileName()}.[name].js`,
  cssBundleFileName: 'bundle.css',
  bundleAssetsFileName: 'assets.json',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 8081,
};

const paths = {
  clientIndexJs: absPath(clientIndexJs),
  clientSrc: absPath(clientSrcDir),
  apiSrc: absPath(apiSrcDir),
  clientBuild: absPath(clientBuild),
  apiBuild: absPath(apiBuild),
  style: absPath(clientStyles),
  htmlTemplate: absPath(htmlTemplate),
  manifest: absPath(clientVendorManifest),
  nodeModules: absPath(nodeModules),
  favicon: absPath(favicon),
  reactLoadableFile: absPath(reactLoadableFile),
};

const checks = {
  vendorExists: fs.existsSync(paths.manifest),
};

const vendor = [
  'react',
  'react-dom',
  'react-router',
  'react-router-dom',
  'redux',
  'react-redux',
  'redux-thunk',
  'react-loadable',
];

module.exports = {
  options,
  paths,
  packageJson,
  vendor,
  checks,
};
