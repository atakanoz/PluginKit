const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  content: [
    './safelist.txt',
    './resources/admin/views/*.php',
    './resources/public/views/*.php',
  ],
  darkMode: 'class',
}
