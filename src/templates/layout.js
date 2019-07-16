import React from 'react';
import styled from 'styled-components';
import Head from '../utils/Helmet';
import MobileNav from '../components/MobileNav';
import PageIntro from '../components/PageIntro';
import Footer from '../components/Footer';

import { Container } from '../styles/LayoutStyles';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.openMobileNav = this.openMobileNav.bind(this);
    this.closeMobileNav = this.closeMobileNav.bind(this);

    this.state = {
      mobileNavIsOpen: false
    };
  }

  openMobileNav() {
    this.setState({
      mobileNavIsOpen: true
    });
  }

  closeMobileNav() {
    this.setState({
      mobileNavIsOpen: false
    });
  }

  render() {
    return (
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
    );
  }
}

export default Layout;
