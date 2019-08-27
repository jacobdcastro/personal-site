import React from 'react';
import { ThemeProvider } from 'styled-components';
import { themes } from './src/styles/__themes';

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={themes.dark}>{element}</ThemeProvider>
);

// ? import primsjs stuff here
