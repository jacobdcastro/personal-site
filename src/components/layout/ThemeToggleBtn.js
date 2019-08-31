import React, { useContext } from 'react';
import { ThemeContext } from '../../utils/ThemeContext';
import lightbulbIcon from '../../images/lightbulb.svg';

const ThemeToggleBtn = () => {
  const themeData = useContext(ThemeContext);

  return (
    <button id="themeToggleBtn" onClick={themeData.toggleTheme}>
      <img src={lightbulbIcon} />
    </button>
  );
};

export default ThemeToggleBtn;
