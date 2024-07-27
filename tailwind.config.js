/** @type {import('tailwindcss').Config} */
const default_theme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/components/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        bebas: ['"Bebas Neue"', ...default_theme.fontFamily.sans],
        montserrat: ['"Montserrat"', ...default_theme.fontFamily.sans]
      }
    }
  },
  plugins: [],
}

