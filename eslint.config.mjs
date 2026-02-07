import { fileURLToPath } from 'node:url';

import { includeIgnoreFile } from '@eslint/compat';
import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tsdoc from 'eslint-plugin-tsdoc';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url));

export default defineConfig([
  includeIgnoreFile(gitignorePath),

  {
    ignores: ['esm', 'examples', 'umd'],
  },

  {
    files: ['**/*.{cjs,cts,js,jsx,mjs,mts,ts,tsx}'],

    plugins: {
      'simple-import-sort': simpleImportSort,
      eslint,
      prettier,
      tsdoc,
    },

    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.vitest,
      },
      parserOptions: {
        project: ['tsconfig.build.json', 'tsconfig.test.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },

    rules: {
      'no-console': 'error',
      'no-debugger': 'error',
      'prettier/prettier': 'error',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
    },
  },

  {
    files: ['__tests__/**'],

    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      // https://github.com/nodejs/node/issues/51292#issuecomment-3151271587
      '@typescript-eslint/no-floating-promises': [
        'error',
        {
          allowForKnownSafeCalls: [
            { from: 'package', name: ['suite', 'test'], package: 'node:test' },
          ],
        },
      ],
    },
  },
]);
