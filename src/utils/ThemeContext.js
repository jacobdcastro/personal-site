import React from 'react';
import { lightTheme, darkTheme } from '../styles/__themes';

const ThemeContext = React.createContext(
  lightTheme // default theme
);

export default ThemeContext;
