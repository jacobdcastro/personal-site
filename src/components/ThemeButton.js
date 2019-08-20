import React from 'react';
import { Wrapper } from '../styles/ThemeButtonStyles';

const ThemeButton = ({ toggleTheme }) => {
  return (
    <Wrapper onClick={toggleTheme()}>
      <div>
        <h1>&amp;</h1>
      </div>
    </Wrapper>
  );
};

export default ThemeButton;
