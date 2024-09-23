/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: ['*.html','./assets/*.js'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}

