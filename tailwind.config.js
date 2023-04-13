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
      'dark': '#29363d',
      'white': '#CEF7ED',
      'primary_red': '#F85067',
      'primary_green': '#366336',
      'primary_yellow': '#FACA4E',
    },
  },
  plugins: [require("daisyui")],
}

