import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

const getConfig = (minify = false) => ({
  external: ['react'],

  input: 'umd/index.ts',

  output: {
    file: `dist/html-react-parser${minify ? '.min' : ''}.js`,
    format: 'umd',
    globals: {
      react: 'React',
    },
    name: 'HTMLReactParser',
    sourcemap: true,
  },

  plugins: [
    typescript({
      declaration: false,
      declarationMap: false,
      module: 'esnext',
      tsconfig: 'tsconfig.build.json',
      compilerOptions: {
        outDir: 'dist',
      },
    }),
    commonjs(),
    resolve({ browser: true }),
    minify && terser(),
  ],
});

export default [getConfig(), getConfig(true)];
