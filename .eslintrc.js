
module.exports = {
  'extends': [
    'standard',
    'plugin:react/recommended'
  ],
  'plugins': [
    'standard',
    'promise',
    'react'
  ],
  'rules': {
    'react/prop-types': 'off',
    'object-curly-spacing': ['error', 'never'],
    'arrow-parens': ['error', 'as-needed'],
    'no-console': 'error',
    'no-warning-comments': 'warn'
  }
}