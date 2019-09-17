import React, { useContext } from 'react';
import { ThemeContext } from '../../utils/ThemeContext';
import lightbulbIcon from '../../images/lightbulb.svg';

const ThemeToggleBtn = () => {
  const themeData = useContext(ThemeContext);

  return (
    <button
      id="themeToggleBtn"
      onClick={themeData.toggleTheme}
      aria-label="toggle dark and light theme"
    >
      <img src={lightbulbIcon} alt="lightbulb icon" />
    </button>
  );
};

export default ThemeToggleBtn;
