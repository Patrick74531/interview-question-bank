/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'link-blue': '#1861BF',
        'font-primary': '#45464D',
        'font-secondary': '#595959',
        'btn-primary': 'indigo',
      },
      width: {
        128: '32rem',
        160: '40rem',
      },
    },
  },

  plugins: [require('@tailwindcss/forms')],
}
