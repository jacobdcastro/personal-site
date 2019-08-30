import React from 'react';
import ThemeContext from '../../utils/ThemeContext';

const ThemeToggleBtn = () => {
  return (
    <ThemeContext.Consumer>
      <button>Toggle Here</button>
    </ThemeContext.Consumer>
  );
};

export default ThemeToggleBtn;
