// These objects are imported in ______________.js to be
// loaded to <ThemeProvider> in gatsby-browser.js via styled-components.

// Theme is determined via state in ____________ and
// switched via a button on every page in site.
const lightTheme = {
  transition: '0.37s',
  bgColor: `white`,
  textColor: `black`,
  accentColor: `purple`,
};

const darkTheme = {
  transition: '0.37s',
  bgColor: `black`,
  textColor: `white`,
  accentColor: `purple`,
};

export { darkTheme, lightTheme };
