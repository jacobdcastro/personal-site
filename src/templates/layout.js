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

  const openMobileNav = () => {
    toggleMobileNav((mobileNavIsOpen = true));
  };

  const closeMobileNav = () => {
    toggleMobileNav((mobeilNavIsOpen = false));
  };

  return (
    <ThemeProvider>
      <Container>
        <Head title={this.props.pageTitle} />
        <MobileNav
          action={this.closeMobileNav}
          open={this.state.mobileNavIsOpen}
        />
        <PageIntro
          action={this.openMobileNav}
          className={this.props.className}
          headline={this.props.headline}
        />

        <main className="mainContent">{this.props.children}</main>

        <Footer backgroundIsBlack={this.props.backgroundIsBlack} />
      </Container>
    </ThemeProvider>
  );
};

export default Layout;
