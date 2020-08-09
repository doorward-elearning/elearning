// eslint-disable-next-line @typescript-eslint/no-var-requires
const babelWebpackConfig = require('@nrwl/react/plugins/webpack');
const DotEnv = require('dotenv-webpack');
const webpack = require('webpack');

console.log('=== Webpack Setup === ');

module.exports = config => {
  config.node = { ...config.node, global: true, fs: 'empty' };
  config.stats.warnings = false;
  config.plugins.push(
    new DotEnv({
      systemvars: true,
    })
  );
  if (config.devServer) {
    // config.devServer.liveReload = true;
    config.devServer.hot = true;
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin());

  return babelWebpackConfig(config);
};
