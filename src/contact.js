import React from 'react';
import styled from 'styled-components';
import MobileNav from './components/MobileNav';
import Navbar from './components/Navbar';
import PageIntro from './components/PageIntro';
import Footer from './components/Footer';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const Container = styled.div`
  height: 100%;
  width: 100%;
  margin: 0;
  padding: auto 18%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
`;

const MainContent = styled.div`
  background-color: #fafafa;
  width: 100%;
  padding: 12px 5px 24px;
  margin: 2px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Body = styled.div`
  padding: 15px;
  width: 88%;
  max-width: 1125px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

class Contact extends React.Component {
  render() {
    return (
      <Container>
        <MobileNav action={this.closeMobileNav} open={this.state.mobileNavIsOpen} />

        <PageIntro action={this.openMobileNav} headline="Who Am I?"/>

        <MainContent>

          <Body>

          </Body>

          <Footer backgroundIsBlack={false} />

        </MainContent>
      </Container>
    );
  }
}

export default Contact;
