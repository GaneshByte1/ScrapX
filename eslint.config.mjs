// Shared ESLint flat config for the monorepo
import globals from 'globals'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import reactNative from 'eslint-plugin-react-native'
import importPlugin from 'eslint-plugin-import'

export default [
  {
    ignores: [
      '**/dist/**',
      '**/build/**',
      '**/.turbo/**',
      '**/coverage/**',
      '**/.eslintcache',
      '**/node_modules/**'
    ]
  },
  // Start from TypeScript-ESLint's recommended rules, then layer React/React Native specifics
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        // Use the project service so individual packages don't all need project references configured
        projectService: true
      },
      globals: {
        ...globals.es2021,
        ...globals.node,
        ...globals.browser
      }
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react-native': reactNative,
      import: importPlugin
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      // General
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',

      // Import hygiene
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
            'type'
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true }
        }
      ],

      // TypeScript
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' }
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
      ],

      // React
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/self-closing-comp': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],

      // React Native (warn on common issues but keep styling flexible per-app)
      'react-native/no-unused-styles': 'warn',
      'react-native/split-platform-components': 'warn',
      'react-native/no-raw-text': 'off',
      'react-native/no-inline-styles': 'off'
    }
  }
]
