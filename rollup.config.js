import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

/**
 * Build rollup config for development (default) or production (minify = true).
 *
 * @param {boolean} [minify=false]
 * @returns - Rollup config.
 */
const getConfig = (minify = false) => ({
  external: ['react'],
  input: 'index.js',
  output: {
    file: `dist/html-react-parser${minify ? '.min' : ''}.js`,
    format: 'umd',
    globals: {
      react: 'React'
    },
    name: 'HTMLReactParser',
    sourcemap: true
  },
  plugins: [commonjs(), resolve({ browser: true }), minify && terser()]
});

export default [getConfig(), getConfig(true)];
