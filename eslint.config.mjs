// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import angular from '@angular-eslint/eslint-plugin';
import angularTemplate from '@angular-eslint/eslint-plugin-template';
import angularTemplateParser from '@angular-eslint/template-parser';
import globals from 'globals';

export default tseslint.config(
  // ── Ignored paths ─────────────────────────────────────────────
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/*.js.map',
      '.changeset/**',
      'tools/**',
    ],
  },

  // ── TypeScript — Angular packages + docs app ───────────────────
  {
    files: [
      'packages/primitives/src/**/*.ts',
      'packages/utils/src/**/*.ts',
      'apps/docs/src/**/*.ts',
    ],
    extends: tseslint.configs.recommended,
    plugins: {
      '@angular-eslint': angular,
    },
    languageOptions: {
      parser: tseslint.parser,
    },
    rules: {
      // ── TypeScript ─────────────────────────────────────────────
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

      // ── Angular ────────────────────────────────────────────────
      '@angular-eslint/contextual-lifecycle': 'error',
      '@angular-eslint/no-empty-lifecycle-method': 'error',
      '@angular-eslint/no-input-rename': 'error',
      '@angular-eslint/no-inputs-metadata-property': 'error',
      '@angular-eslint/no-output-native': 'error',
      '@angular-eslint/no-output-on-prefix': 'error',
      '@angular-eslint/no-output-rename': 'error',
      '@angular-eslint/no-outputs-metadata-property': 'error',
      '@angular-eslint/prefer-standalone': 'error',
      '@angular-eslint/use-pipe-transform-interface': 'error',
      '@angular-eslint/use-lifecycle-interface': 'warn',
    },
  },

  // ── Spec files — relaxed rules ──────────────────────────────────
  {
    files: ['packages/primitives/src/**/*.spec.ts', 'apps/docs/src/**/*.spec.ts'],
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // ── HTML templates ─────────────────────────────────────────────
  {
    files: ['apps/docs/src/**/*.html'],
    plugins: {
      '@angular-eslint/template': angularTemplate,
    },
    languageOptions: {
      parser: angularTemplateParser,
    },
    rules: {
      '@angular-eslint/template/banana-in-box': 'error',
      '@angular-eslint/template/no-negated-async': 'warn',
      '@angular-eslint/template/no-duplicate-attributes': 'error',
    },
  },

  // ── CLI — plain JavaScript (Node.js) ──────────────────────────
  {
    files: ['packages/ngatoms/src/**/*.js', 'packages/ngatoms/bin/**/*.js'],
    extends: [eslint.configs.recommended],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
);
