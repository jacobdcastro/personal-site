import React from 'react';
import Head from '../utils/Helmet';
import MobileNav from '../components/MobileNav';
import PageIntro from '../components/PageIntro';
import Footer from '../components/Footer';
import '../utils/normalize.css';

import { Container } from '../styles/LayoutStyles';
import { ThemeProvider } from 'styled-components';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.openMobileNav = this.openMobileNav.bind(this);
    this.closeMobileNav = this.closeMobileNav.bind(this);

    this.state = {
      mobileNavIsOpen: false,
    };
  }

  openMobileNav() {
    this.setState({
      mobileNavIsOpen: true,
    });
  }

  closeMobileNav() {
    this.setState({
      mobileNavIsOpen: false,
    });
  }

  render() {
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

          <div className="mainContent">{this.props.children}</div>

          <Footer backgroundIsBlack={this.props.backgroundIsBlack} />
        </Container>
      </ThemeProvider>
    );
  }
}

export default Layout;
