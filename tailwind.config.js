/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'link-blue': '#1861BF',
        'font-primary': '#45464D',
        'font-secondary': '#899296',
        'btn-primary': 'indigo',
      },
      width: {
        128: '32rem',
      },
    },
  },

  plugins: [require('@tailwindcss/forms')],
}
