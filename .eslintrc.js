module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier'],
  parser: '@typescript-eslint/parser',
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  ignorePatterns: ['Conversations/**'],
  rules: {
    'arrow-body-style': 'warn',
    'react/jsx-curly-newline': 'warn',
    'react/jsx-wrap-multilines': ['warn', { declaration: false, assignment: false }],
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'import/no-cycle': 1,
    'import/no-extraneous-dependencies': 'warn',
    'import/prefer-default-export': 0,
    'no-unused-expressions': 'warn',
    'no-underscore-dangle': 'warn',
    'no-use-before-define': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['url', 'href', 'to'],
      },
    ],
    'react/require-default-props': ['warn', { ignoreFunctionalComponents: true }],
    'react/prefer-stateless-function': 1,
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'react/jsx-props-no-spreading': 0,
    'react/no-array-index-key': 1,
    'react/jsx-closing-bracket-location': 'off',
    'react/jsx-one-expression-per-line': 1,
    'react-hooks/exhaustive-deps': 1,
    'react/sort-comp': 'off',
    'global-require': 'off',
    // 'object-curly-spacing': 1,
    'operator-linebreak': 'off',
    'no-empty-function': ['error', { allow: ['constructors'] }],
    'no-useless-constructor': 0,
    'no-param-reassign': ['warn', { props: false }],
    'no-prototype-builtins': 1,
    'no-nested-ternary': 'warn',
    'no-eq-null': 'warn',
    'no-shadow': 'off',
    camelcase: 'off',
    '@typescript-eslint/no-shadow': 'warn',
    '@typescript-eslint/no-use-before-define': 'error',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/member-ordering': 'warn',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/prefer-literal-enum-member': 'off',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'explicit',
        overrides: {
          accessors: 'explicit',
          constructors: 'no-public',
          methods: 'explicit',
          properties: 'explicit',
          parameterProperties: 'explicit',
        },
      },
    ],
    'prettier/prettier': [
      'error',
      {
        semi: true,
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 100,
        tabWidth: 2,
        endOfLine: 'auto',
      },
    ],
    'import/no-named-as-default': 'warn',
  },
  overrides: [
    {
      files: ['*test.ts', '*test.tsx', '*spec.ts'],
      rules: {
        'no-console': 'off',
      },
    },
  ],
};
