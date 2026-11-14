const { defineConfig, globalIgnores } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const globals = require('globals');

module.exports = defineConfig([
  globalIgnores([
    'dist/**',
    'web-build/**',
    '.expo/**',
    '.browser-check/**',
    'android/**',
    'ios/**',
    'expo-env.d.ts',
  ]),
  expoConfig,
  {
    files: ['eslint.config.js', 'tests/**/*.ts', 'tests/**/*.mjs'],
    languageOptions: {
      globals: globals.node,
    },
  },
]);
