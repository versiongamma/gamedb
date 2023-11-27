/** @type {import('next').NextConfig} */
const removeImports = require('next-remove-imports')();

module.exports = (_phase, { defaultConfig }) => {
  return removeImports({
    ...defaultConfig,
  });
};
