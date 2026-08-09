import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactNative from 'eslint-plugin-react-native';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import sonarjs from 'eslint-plugin-sonarjs';
import security from 'eslint-plugin-security';
import prettier from 'eslint-config-prettier/flat';
import {defineConfig} from 'eslint/config';

export default defineConfig([
  {
    ignores: [
      'android/**',
      'ios/**',
      'build/**',
      'node_modules/**',
      'coverage/**',
      'playwright-report/**',
      'test-results/**',
      '**/*.log',
      '.DS_Store',
    ],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    extends: [
      'eslint:recommended',
      'plugin:react-native/all',
      ...tsPlugin.configs['flat/recommended'],
      sonarjs.configs.recommended,
      security.configs.recommended,
      prettier,
    ],
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
      'react-native': reactNative,
      security: security,
    },
    rules: {
      'prettier/prettier': 'warn',
      'sonarjs/cognitive-complexity': ['warn', 15],
      'react-native/no-inline-styles': 'warn',
      'no-inline-comments': 'error',
      'line-comment-position': ['error', {position: 'above'}],
      'multiline-comment-style': ['error', 'starred-block'],
      'no-warning-comments': [
        'error',
        {
          terms: ['todo', 'fixme', 'bug', 'ajuste', 'remover', 'nota'],
          location: 'anywhere',
        },
      ],
    },
    languageOptions: {
      globals: globals.node,
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {jsx: true},
      },
    },
  },
]);
