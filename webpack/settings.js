const path = require('path');
const fs = require('fs');
const packageJson = require('../package.json');

const rootDir = fs.realpathSync(process.cwd());
const clientSrcDir = 'client';
const apiSrcDir = 'api';
const clientBuild = 'client_build';
const apiBuild = 'api_build';
const htmlTemplate = `${clientSrcDir}/public/index.html`;
const clientStyles = `${clientSrcDir}/assets/styles`;
const clientVendorManifest = `${clientBuild}/vendor.manifest.json`;

function absPath(realPath) {
  return path.resolve(rootDir, realPath);
}

function getFileName() {
  const name = packageJson.name || '[name]';
  const version = packageJson.version || '';
  return version !== '' ? `${name}-${version}` : name;
}

const options = {
  fileName: `${getFileName()}.min.js`,
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 8081,
};

const paths = {
  clientSrc: absPath(clientSrcDir),
  apiSrc: absPath(apiSrcDir),
  clientBuild: absPath(clientBuild),
  apiBuild: absPath(apiBuild),
  style: absPath(clientStyles),
  htmlTemplate: absPath(htmlTemplate),
  manifest: absPath(clientVendorManifest),
};

const checks = {
  vendorExists: fs.existsSync(paths.manifest),
};

const vendor = [
  'react',
  'react-dom',
  'redux',
  'react-redux',
  'redux-thunk',
];

module.exports = {
  options,
  paths,
  packageJson,
  vendor,
  checks,
};
