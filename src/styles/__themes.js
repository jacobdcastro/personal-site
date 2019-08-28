// These objects are imported in ______________.js to be
// loaded to <ThemeProvider> in gatsby-browser.js via styled-components.

// Theme is determined via state in ____________ and
// switched via a butotn on every page in site.

export const themes = {
  dark: {
    bgColor: `black`,
    textColor: `white`,
    accentColor: `purple`
  },
  light: {
    bgColor: `white`,
    textColor: `black`,
    accentColor: `purple`
  },
};
