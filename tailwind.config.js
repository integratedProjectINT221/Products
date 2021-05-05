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
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
