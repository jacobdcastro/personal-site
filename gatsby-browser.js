import React from 'react';
import ThemeContextWrapper from './src/utils/ThemeContext';

// provide theme state to entire app
export const wrapRootElement = ({ element }) => (
  <ThemeContextWrapper>{element}</ThemeContextWrapper>
);

// ? primsjs stuff
require('prismjs/themes/prism-tomorrow.css');
