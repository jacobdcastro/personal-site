import Typography from 'typography';

const typography = new Typography({
  baseFontSize: '16px',
  baseLineHeight: '1.666',
  headerFontFamily: ['Montserrat', 'Helvetica', 'sans-serif'],
  bodyFontFamily: ['Open Sans', 'sans-serif'],
  googleFonts: [
    {
      name: 'Montserrat',
      styles: ['800', '400'],
    },
    {
      name: 'Helvetica',
      styles: ['800', '400'],
    },
    {
      name: 'Open Sans',
      styles: ['400', '300', '200'],
    },
  ],
});

export default typography;
