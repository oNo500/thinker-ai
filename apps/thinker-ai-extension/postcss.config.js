export default {
  plugins: {
    '@tailwindcss/postcss': {},
    '@thedutchcoder/postcss-rem-to-px': {
      baseValue: 16,
      unitPrecision: 5,
      replace: true,
    },
    'autoprefixer': {},
  },
};


