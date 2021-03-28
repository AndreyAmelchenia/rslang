module.exports = {
  trailingComma: "all",
  semi: true,
  singleQuote: false,
  bracketSpacing: true,
  printWidth: 100,
  arrowParens: "always",
  overrides: [
    {
        files: "*.component.html",
        options: {
            parser: "angular"
        }
    },
    {
        files: "*.html",
        options: {
            parser: "html"
        }
    }
]
};