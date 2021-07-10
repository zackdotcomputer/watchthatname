module.exports = {
  extends: [
    './node_modules/@redwoodjs/eslint-config/index.js',
    'plugin:prettier/recommended',
    'prettier',
  ].filter(Boolean),
  plugins: ['prettier'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: './tsconfig.eslint.json',
        sourceType: 'module',
      },
    },
  ],
}
