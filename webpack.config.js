const babelWebpackConfig = require('@nrwl/react/plugins/babel');

module.exports = config => {
  config.module.rules.push({
    test: /\.svg$/,
    use: [
      '@svgr/webpack',
      'url-loader',
    ],
  }, {
    test: /\.(png|jpg|gif|woff|woff2)$/i,
    use: [{
      loader: 'url-loader',
      options: {
        limit: 8192,
      },
    }],
  });
  return babelWebpackConfig(config);
};
