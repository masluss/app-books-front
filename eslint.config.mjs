import nuxt from '@nuxt/eslint-config/flat';
import prettier from 'eslint-config-prettier';

export default [
  ...nuxt(),

  {
    rules: {
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',

      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn'
    },
    plugins: {
      'simple-import-sort': await import('eslint-plugin-simple-import-sort').then(m => m.default || m)
    }
  },
  prettier
];
