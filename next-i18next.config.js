/** @type {import('next-i18next').UserConfig} */
const path = require('path');

module.exports = {
  i18n: {
    locales: ['en', 'tr', 'de', 'es'],
    defaultLocale: 'en',
  },
  localePath: path.resolve('./public/locales')
}