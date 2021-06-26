module.exports = {
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    "plugin:cypress/recommended"
  ],
  plugins: ['react', '@typescript-eslint', 'cypress'
  ],
  env: {
    browser: true,
    es6: true,
    "cypress/globals": true
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    'linebreak-style': 'off',
    "import/no-anonymous-default-export": "off",
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    '@typescript-eslint/no-shadow': 'warn',
    '@typescript-eslint/naming-convention': 'warn',
    'react/require-default-props': 'warn',
    'consistent-return': 'warn',
    'import/no-extraneous-dependencies': 'off',
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/no-noninteractive-element-interactions': 'warn',
    "import/prefer-default-export": 0,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
