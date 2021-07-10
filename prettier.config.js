// https://prettier.io/docs/en/options.html
/** @type {import('prettier').RequiredOptions} */
module.exports = {
  arrowParens: "always",
  bracketSpacing: true,
  embeddedLanguageFormatting: "auto",
  htmlWhitespaceSensitivity: "css",
  insertPragma: false,
  jsxBracketSameLine: false,
  jsxSingleQuote: false,
  endOfLine: "lf",
  printWidth: 100,
  proseWrap: "preserve",
  quoteProps: "as-needed",
  requirePragma: false,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: "none",
  useTabs: false,
  vueIndentScriptAndStyle: false,
  overrides: [
    {
      files: "Routes.*",
      options: {
        printWidth: 999
      }
    }
  ]
};
