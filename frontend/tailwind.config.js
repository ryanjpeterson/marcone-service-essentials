/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        marcone: {
          red: '#d22640',
          lightGrey: '#F4F3F2',
          darkGrey: '#777',
        }
      },
      height: {
        screen: '100dvh',
      }
    },
  },
  plugins: [],
}