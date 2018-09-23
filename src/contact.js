import React from 'react';
import styled from 'styled-components';
import MobileNav from './components/MobileNav';
import PageIntro from './components/PageIntro';
import GeneralForm from './components/GeneralForm';
import ProjectForm from './components/ProjectForm';
import Footer from './components/Footer';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import styles from './styles/contact-styles.css';

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

const FormsHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormH2 = styled.h2`
  @media (min-width: 820px) {
    font-size: 2em;
  }
`;

const FormH3 = styled.h3`
  @media (min-width: 820px) {
    font-size: 1.6em;
  }
`;

const FormBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormButton = styled.button`
  margin: 8px auto;
  background-color: #fff;
  padding: 10px;
  border: none;
  box-shadow: 0px 0px 15px #444;
  &:hover {cursor: pointer;}
`;

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.openMobileNav = this.openMobileNav.bind(this);
    this.closeMobileNav = this.closeMobileNav.bind(this);

    this.state = {
      mobileNavIsOpen: false,
      bgImg: './images/yellow-telephone.jpg'
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

        <PageIntro action={this.openMobileNav} headline="Let's Chat" aboutPage={false} />

        <MainContent>

          <Body>
            <FormsHeader>
              <FormH2>I can't wait to hear from you!</FormH2>
              <FormH3>So, what do you need?</FormH3>
              <FormBtnContainer>
                <FormButton id="genBtn" onClick="showGenForm()">Question or Comment</FormButton>
                <FormButton id="protBtn" onClick="showProjectForm()">I need a website built!</FormButton>
              </FormBtnContainer>
            </FormsHeader>

            <GeneralForm />

            <ProjectForm />

          </Body>

          <Footer backgroundIsBlack={false} />

        </MainContent>
      </Container>
    );
  }
}

export default Contact;
