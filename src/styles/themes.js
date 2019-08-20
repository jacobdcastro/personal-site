// These objects are imported in templates/Layout.js to be
// loaded to <ThemeProvider> in styled-components.

// Theme is determined via state in <Layout> and
// switched via a butotn on every page in site.

const darkTheme = {
  bgColor: `#000`,
  textColor: `#fff`,
};

const lightTheme = {
  bgColor: `#fff`,
  textColor: `000`,
};

export { darkTheme, lightTheme };
