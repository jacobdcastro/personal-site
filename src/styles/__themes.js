// These objects are imported in templates/Layout.js to be
// loaded to <ThemeProvider> in styled-components.

// Theme is determined via state in <Layout> and
// switched via a butotn on every page in site.

const darkTheme = {
  bgColor: `black`,
  textColor: `white`,
};

const lightTheme = {
  bgColor: `white`,
  textColor: `black`,
};

export { darkTheme, lightTheme };
