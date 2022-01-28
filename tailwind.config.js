const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  content: [
    './safelist.txt',
    './admin/**/*.php',
    './public/**/*.php',
    './includes/**/*.php',
  ],
  darkMode: 'class',
}
