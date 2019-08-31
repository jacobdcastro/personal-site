import React, { useContext } from 'react';
import { ThemeContext } from '../utils/ThemeContext';
import { ThemeProvider } from 'styled-components';

import { Wrapper } from '../styles/LayoutStyles';
import Header from '../components/layout/Header';
import ThemeToggleBtn from '../components/layout/ThemeToggleBtn';

const Layout = props => {
  // subscribes to value from ../utils/ThemeContext.js and
  // gives current theme to styled-components <ThemeProvider>
  const theme = useContext(ThemeContext);

  return (
    <ThemeProvider theme={theme.currentTheme}>
      <Wrapper>
        <Header />

        <main>{props.children}</main>

        <ThemeToggleBtn />
      </Wrapper>
    </ThemeProvider>
  );
};

export default Layout;
