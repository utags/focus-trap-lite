/** @type {import('xo').FlatXoConfig} */
const xoConfig = [
  {
    files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
    space: 2,
    prettier: 'compat',
    languageOptions: {
      globals: {
        document: 'readonly',
      },
    },
    rules: {
      'capitalized-comments': 0,
      'unicorn/prevent-abbreviations': 0,
      'unicorn/prefer-spread': 0,
      'unicorn/prefer-at': 0,
      'prefer-destructuring': 0,
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        {
          selector: 'objectLiteralProperty',
          format: null,
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
      ],
    },
  },
]

export default xoConfig
