import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    ignores: ['dist', 'node_modules', 'src/db/**/migrations/*', 'src/**/*.test.ts', 'jest.config.ts', 'jest.config.unit.ts', 'jest.config.integration.ts']
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: globals.browser
    },
    ignores: ['dist']
  },

  {
    files: ['**/*.{ts,mts,cts,tsx}'],
    plugins: { tseslint },
    extends: [tseslint.configs.recommended],
    languageOptions: {
      globals: globals.browser
    },

    rules: {
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/space-before-function-paren': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/method-signature-style': 'off',
      '@typescript-eslint/promise-function-async': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/prefer-readonly': 'off',
      '@typescript-eslint/keyword-spacing': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-redeclare': 'off',
      '@typescript-eslint/brace-style': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/indent': 'off',
      '@typescript-eslint/semi': 'off',
      'import/no-duplicates': 'off',
      'brace-style': 'off',
      'no-void': 'off',
      indent: 'off',
      semi: 'off'
    }
  }
]);
