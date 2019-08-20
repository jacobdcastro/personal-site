import React from 'react';
import Head from '../utils/Helmet';
import MobileNav from '../components/MobileNav';
import PageIntro from '../components/PageIntro';
import Footer from '../components/Footer';
import { Container } from '../styles/LayoutStyles';
import '../utils/normalize.css';

import { darkTheme, lightTheme } from '../styles/themes';
import { ThemeProvider } from 'styled-components';

const Layout = () => {
  const [mobileNavIsOpen, toggleMobileNav] = useState(false);
  const [isLightTheme, toggleTheme] = useState(true);

  const openMobileNav = () => {
    toggleMobileNav((mobileNavIsOpen = true));
  };

  const closeMobileNav = () => {
    toggleMobileNav((mobeilNavIsOpen = false));
  };

  return (
    <ThemeProvider>
      <Container>
        <Head title={props.pageTitle} />

        <main className="mainContent">{props.children}</main>

        <Footer />

        <ThemeButton toggleTheme={toggleTheme} />
      </Container>
    </ThemeProvider>
  );
};

export default Layout;
