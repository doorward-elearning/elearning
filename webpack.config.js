// eslint-disable-next-line @typescript-eslint/no-var-requires
const babelWebpackConfig = require('@nrwl/react/plugins/webpack');
const DotEnv = require('dotenv-webpack');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

console.log('=== Webpack Setup === ');

module.exports = (config) => {
  config.node = { ...config.node, global: true, fs: 'empty' };
  config.stats.warnings = false;
  config.plugins.push(
    new DotEnv({
      systemvars: true,
    })
  );
  if (process.env.NODE_ENV === 'production') {
  } else {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    if (config.devServer) {
      // config.devServer.liveReload = true;
      config.devServer.hot = true;
    }
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  const webpackConfig = babelWebpackConfig(config);

  webpackConfig.mode = process.env.NODE_ENV || 'development';
  webpackConfig.optimization.mergeDuplicateChunks = false;

  if (process.env.NODE_ENV === 'production') {
    webpackConfig.optimization = {
      minimize: true,
      minimizer: [new TerserPlugin()],
    };
  }

  return webpackConfig;
};
