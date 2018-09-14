var path = require('path');

/**
 * Webpack configuration.
 */
module.exports = {
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    library: 'HTMLReactParser',
    libraryTarget: 'umd'
  },
  externals: {
    react: {
      amd: 'react',
      commonjs: 'react',
      commonjs2: 'react',
      root: 'React'
    }
  },
  mode: process.env.NODE_ENV
};
