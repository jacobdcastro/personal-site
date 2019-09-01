import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../utils/ThemeContext';
import { ThemeProvider } from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';

import { LayoutWrapper } from '../styles/LayoutStyles';
import Header from '../components/layout/Header';
import ThemeToggleBtn from '../components/layout/ThemeToggleBtn';
import Footer from '../components/layout/Footer';

const Layout = ({ children }) => {
  // subscribes to value from ../utils/ThemeContext.js and
  // gives current theme to styled-components <ThemeProvider>
  const theme = useContext(ThemeContext);
  let [mobileNavIsOpen, toggleMobileNav] = useState(false);

  const mobileNavAction = () => {
    toggleMobileNav(
      mobileNavIsOpen ? (mobileNavIsOpen = false) : (mobileNavIsOpen = true)
    );
  };

  // adds smooth scrolling
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line global-require
      require('smooth-scroll')('a[href*="#"]');
    }
  });

  return (
    <ThemeProvider theme={theme.currentTheme}>
      <LayoutWrapper>
        <Header mobileNavIsOpen={mobileNavIsOpen} action={mobileNavAction} />
        <ThemeToggleBtn />

        <main>{children}</main>

        <Footer />
      </LayoutWrapper>
    </ThemeProvider>
  );
};

export default Layout;
