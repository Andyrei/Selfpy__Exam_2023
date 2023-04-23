/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Exo\\ 2',...defaultTheme.fontFamily.sans]
      }
    },
    colors: {
      'dark': {
        DEFAULT: '#29363d',
        darker: '#1b2328',
      },
      'white': {
        light: '#e6fbf5',
        DEFAULT: '#CEF7ED',
        dark: '#CEf5ED',
      },
      'accentPrimary': '#F85067',
      'primary_green': '#366336',
      'primary_yellow': '#FACA4E',
    },
  },
  daisyui: {
    themes: [{
      dark: {
        ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
        primary: '#F85067',
        secondary: '#FACA4E'
      }
    }],
  },
  plugins: [require("daisyui")],
}

