module.exports = function config(env) {
  return require(`./webpack/webpack.config.${env}`)();
};
