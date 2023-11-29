/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,vue}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'Arial, Helvetica, sans-serif']
      }
    },
  },
  daisyui: {
    themes: false,
    darkTheme: 'dim'
  },
  plugins: [require("daisyui")],
}
