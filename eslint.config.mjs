import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import stylistic from '@stylistic/eslint-plugin'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:@stylistic/recommended-extends',
    'plugin:@typescript-eslint/stylistic',
    'plugin:react/recommended',
  ),
  {
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
      'no-console': 'warn',
      'no-var': 'warn',
      'implicit-arrow-linebreak': 'warn',
      'array-bracket-spacing': 'warn',
      'max-params': ['warn', { max: 3 }],
      'max-depth': ['warn', { max: 3 }],
      'no-lonely-if': 'warn',
      'no-multiple-empty-lines': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/display-name': 'warn',
      'react/jsx-props-no-spreading': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'no-param-reassign': 'off',
      'import/prefer-default-export': 'off',
      '@typescript-eslint/consistent-type-imports': 'warn',
      'import/order': 'off',
      'object-curly-newline': ['error', { multiline: false, consistent: true }],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]

export default eslintConfig
