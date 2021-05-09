module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      margin: {
        '116': '29rem',
      },
      spacing:{
        '160': '40rem',
        '170': '50rem',
        '180': '64rem',
        '200': '80rem'
      },
      fontFamily:{
        'poppins': "'poppins'",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
