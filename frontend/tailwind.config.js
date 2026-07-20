/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green-50': '#f0fdf4',
        'primary': '#006633',
        'primary-dark': '#004D26',
        'text-primary': '#222222',
        'text-secondary': '#555555',
      },
    },
  },
  plugins: [],
}
