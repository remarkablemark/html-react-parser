import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';

const config = {
  external: ['react'],
  input: 'index.js',
  output: {
    format: 'umd',
    globals: {
      react: 'React'
    },
    name: 'HTMLReactParser'
  },
  plugins: [commonjs(), resolve({ browser: true })]
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(uglify());
}

export default config;
