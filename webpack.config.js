const { resolve } = require('path');
const { NODE_ENV } = process.env;

const config = {
  entry: resolve(__dirname, 'index.js'),
  output: {
    library: 'HTMLReactParser',
    libraryTarget: 'umd',
    path: resolve(__dirname, 'dist')
  },
  externals: {
    react: {
      amd: 'react',
      commonjs: 'react',
      commonjs2: 'react',
      root: 'React'
    }
  },
  mode: NODE_ENV
};

if (NODE_ENV === 'production') {
  config.devtool = 'source-map';
}

module.exports = config;
