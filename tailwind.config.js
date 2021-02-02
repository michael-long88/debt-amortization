module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      transformOrigin: {
        0: '0%'
      },
      zIndex: {
        '-1': '-1'
      }
    }
  },
  variants: {
    extend: {
      borderColor: ['responsive', 'hover', 'focus', 'focus-within']
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
