// eslint-disable-next-line @typescript-eslint/no-var-requires
const babelWebpackConfig = require('@nrwl/react/plugins/babel');
const DotEnv = require('dotenv-webpack');
const webpack = require('webpack');

console.log('=== Webpack Setup === ');

module.exports = config => {
  config.module.rules.push(
    {
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    },
    {
      test: /\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$/,
      use: ['url-loader'],
    }
  );
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

  console.log(config);
  return babelWebpackConfig(config);
};
