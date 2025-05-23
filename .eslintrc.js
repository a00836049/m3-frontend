module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:security/recommended'
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-react']
    }
  },
  plugins: [
    'react',
    'react-hooks',
    'security'
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': ['warn', { 
      'argsIgnorePattern': '^_', 
      'varsIgnorePattern': '^_',
      'ignoreRestSiblings': true 
    }],
    'react/prop-types': 'off',
    // Security rules
    'security/detect-object-injection': 'warn',
    'security/detect-non-literal-regexp': 'warn',
    'security/detect-unsafe-regex': 'warn',
    'security/detect-buffer-noassert': 'error',
    'security/detect-eval-with-expression': 'error',
    'security/detect-pseudoRandomBytes': 'warn',
    'security/detect-possible-timing-attacks': 'warn',
    'security/detect-no-csrf-before-method-override': 'error'
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  globals: {
    fetch: 'readonly',
    localStorage: 'readonly',
    window: 'readonly',
    document: 'readonly',
    console: 'readonly',
    setTimeout: 'readonly',
    jest: 'readonly',
    describe: 'readonly',
    test: 'readonly',
    expect: 'readonly',
    beforeEach: 'readonly',
    require: 'readonly',
    global: 'readonly'
  }
};
