import React from 'react';
import { themes } from '../styles/__themes';
import { ThemeProvider } from 'styled-components';

const ThemeContext = () => {
  return <ThemeProvider theme={themes.light} />;
};

export default ThemeContext;
