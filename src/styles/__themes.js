// These objects are imported in ______________.js to be
// loaded to <ThemeProvider> in gatsby-browser.js via styled-components.

// Theme is determined via state in ____________ and
// switched via a button on every page in site.
const lightTheme = {
  bgColor: `white`,
  textColor: `black`,
  accentColor: `purple`,
};

const darkTheme = {
  bgColor: `black`,
  textColor: `white`,
  accentColor: `purple`,
};

export { darkTheme, lightTheme };
