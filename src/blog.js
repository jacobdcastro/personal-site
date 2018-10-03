import React from 'react';
import MobileNav from './components/MobileNav';
import PageIntro from './components/PageIntro';
import Footer from './components/Footer';
import styled from 'styled-components';

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
  padding: 12px 0px 24px;
  margin: 2px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const MiscLinks = styled.a`
  text-decoration: underline;
  color: inherit;
`;

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.openMobileNav = this.openMobileNav.bind(this);
    this.closeMobileNav = this.closeMobileNav.bind(this);

    this.state = {
      mobileNavIsOpen: false,
      bgImg: './images/cave.jpg'
    }
  }

  openMobileNav() {
    this.setState({
      mobileNavIsOpen: true
    })
  }

  closeMobileNav() {
    this.setState({
      mobileNavIsOpen: false
    })
  }

  render() {
    return (
      <Container>
        <MobileNav action={this.closeMobileNav} open={this.state.mobileNavIsOpen} />

        <PageIntro action={this.openMobileNav} headline="My Blog" aboutPage={true} />

        <MainContent>



          <Footer backgroundIsBlack={false} />

        </MainContent>
      </Container>
    );
  }
}

export default Blog;
