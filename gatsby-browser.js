import React from 'react';
import ThemeContext from './src/utils/ThemeContext';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './src/styles/__themes';

// provide theme state to entire app
export const wrapRootElement = ({ element }) => (
  <ThemeContext.Provider value={ThemeContext}>{element}</ThemeContext.Provider>
);

const ThemeWrapper = () => {
  return <ThemeProvider theme={ThemeContext} />;
};

// give theme state to styled-components to use
export const wrapPageElement = ({ element, props }) => (
  <ThemeContext.Consumer
    render={value => (
      <ThemeProvider theme={ThemeContext}>{element}</ThemeProvider>
    )}
  />
);

// ? import primsjs stuff here
