module.exports = {
  content: [
    './**/*.{js,ts,jsx,tsx}',
    // Add extra paths here
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        purple: {
          1: '#8E2DE2',
          2: '#4A00E0',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/ui')],
};
