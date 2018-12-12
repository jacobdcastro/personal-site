import React from 'react';
import styled from 'styled-components';
import Head from '../utils/Helmet';
import MobileNav from '../components/MobileNav';
import PageIntro from '../components/PageIntro';
import Footer from '../components/Footer';

const PageContainer = styled.div`
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
         <PageContainer>
            <Head title={this.props.pageTitle} />
            <MobileNav action={this.closeMobileNav} open={this.state.mobileNavIsOpen} />
            <PageIntro action={this.openMobileNav} className={this.props.className} headline={this.props.headline} />
            
            <MainContent>
               {this.props.children}
            </MainContent>
            
            <Footer backgroundIsBlack={this.props.backgroundIsBlack} />
         </PageContainer>
      );
   }
}

export default Layout;