import importPlugin from 'eslint-plugin-import'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import stylistic from '@stylistic/eslint-plugin'
import stylisticTs from '@stylistic/eslint-plugin-ts'
import prettier from 'eslint-plugin-prettier'
import customRules from './custom-eslint-rules/index.mjs'
import reactCompiler from 'eslint-plugin-react-compiler'

export default [
  {
    ignores: ['dist'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tsparser,
      sourceType: 'module',
    },
    plugins: {
      custom: customRules,
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@stylistic': stylistic,
      '@stylistic/ts': stylisticTs,
      '@typescript-eslint': tseslint,
      import: importPlugin,
      prettier,
      'react-compiler': reactCompiler,
    },
    rules: {
      'react/jsx-newline': ['error', { prevent: true, allowMultilines: true }],
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
      'custom/no-nested-relative-imports': 'error',
      'custom/no-restricted-imports': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      curly: ['error', 'all'],
      semi: ['error', 'never'],
      'no-magic-numbers': 'off',
      'no-var': 'error',
      'react-compiler/react-compiler': 'error',

      '@stylistic/padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: 'import',
          next: [
            'expression',
            'function',
            'class',
            'export',
            'const',
            'let',
            'var',
          ],
        },
        {
          blankLine: 'always',
          prev: [
            'expression',
            'function',
            'class',
            'export',
            'const',
            'let',
            'var',
          ],
          next: 'import',
        },

        { blankLine: 'always', prev: '*', next: 'return' },

        { blankLine: 'always', prev: '*', next: 'block-like' },
        { blankLine: 'always', prev: 'block-like', next: '*' },

        { blankLine: 'always', prev: 'if', next: '*' },
        { blankLine: 'always', prev: '*', next: 'if' },

        { blankLine: 'always', prev: 'function', next: '*' },
        { blankLine: 'always', prev: '*', next: 'function' },

        { blankLine: 'always', prev: '*', next: 'expression' },
        { blankLine: 'always', prev: 'expression', next: '*' },

        { blankLine: 'always', prev: '*', next: 'multiline-const' },
        { blankLine: 'always', prev: 'multiline-const', next: '*' },

        { blankLine: 'always', prev: '*', next: 'multiline-expression' },
        { blankLine: 'always', prev: 'multiline-expression', next: '*' },

        { blankLine: 'always', prev: '*', next: ['enum', 'interface', 'type'] },
        { blankLine: 'always', prev: ['enum', 'interface', 'type'], next: '*' },
      ],

      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          pathGroups: [
            { pattern: '@app/**', group: 'internal', position: 'after' },
            { pattern: '@pages/**', group: 'internal', position: 'after' },
            { pattern: '@widgets/**', group: 'internal', position: 'after' },
            { pattern: '@features/**', group: 'internal', position: 'after' },
            { pattern: '@entities/**', group: 'internal', position: 'after' },
            { pattern: '@shared/**', group: 'internal', position: 'after' },
          ],
          pathGroupsExcludedImportTypes: ['react'],
        },
      ],

      'no-restricted-imports': [
        'error',
        {
          patterns: [
            '@app/*/*',
            '@pages/*/*',
            '@widgets/*/*',
            '@features/*/*',
            '@entities/*/*',
            '@shared/*/*',
            '!@shared/assets/*',
          ],
        },
      ],

      '@typescript-eslint/no-unused-vars': [
        'warn',
        { vars: 'all', args: 'after-used', ignoreRestSiblings: false },
      ],
    },
  },
]
