import React, { useContext } from 'react';
import { ThemeContext } from '../../utils/ThemeContext';

const ThemeToggleBtn = () => {
  const themeData = useContext(ThemeContext);

  return <button onClick={themeData.toggleTheme}>Toggle Here</button>;
};

export default ThemeToggleBtn;
