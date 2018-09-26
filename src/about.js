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

const Body = styled.div`
  padding: 15px;
  width: 88%;
  max-width: 1125px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AboutSection = styled.div`
  max-width: 1025px;
`;

const AboutHeadline = styled.h2`
  font-family: 'Montserrat', 'Helvetica', sans-serif;
  text-align: center;
  letter-spacing: 1px;
  color: #353535;
    @media (min-width: 820px) {
      font-size: 2em;
    }
`;

const AboutContent = styled.p`
  font-family: 'Montserrat', 'Helvetica', sans-serif;
  margin: 14px auto;
  max-width: 1125px;
  font-weight: 500;
  letter-spacing: 0.5px;
  line-height: 27px;
  color: #353535;

  @media (min-width: 820px) {
    width: 80%;
    font-size: 1.1em;
  }
`;

const MiscLinks = styled.a`
  text-decoration: underline;
  color: inherit;
`;

class About extends React.Component {
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

        <PageIntro action={this.openMobileNav} headline="Who Am I?" aboutPage={true} />

        <MainContent>

          <Body>
            <AboutSection>
              <AboutHeadline>About Me</AboutHeadline>
              <AboutContent>
                My name is Jacob Daniel Castro. I am a front-end web developer. I love to code websites and stuff like that.<br />
                I started learning to code HTML and CSS in 2015 after I graduated high school. I was a little on-and-off with my learning up until the end of 2017 where I decided that web development was, indeed, the career I wanted to pursue. From there, I jumped into JavaScript and have been falling more and more in love with web development ever since.
              </AboutContent>
              <AboutContent>
                After coding, I also really enjoy design. My favorite sans-serif fonts are <MiscLinks href="https://www.myfonts.com/fonts/linotype/helvetica/">Helvetica</MiscLinks> and <MiscLinks href="https://fonts.google.com/specimen/Montserrat">Montserrat</MiscLinks>. I don't really have a favorite serif font (yet), but they're cool too, I guess.
              </AboutContent>
              <AboutContent>
                One of my favorite things to do is take my passion for design and love for coding and combine them in my projects. I'm obssessed with gorgeous UI's; designing my own (for clients or otherwise) is so satisfying. And then translating that into code and crafting a truly memorable UX is my passion.
              </AboutContent>
              <AboutContent>
                I live in Santa Maria, CA but my goal is to move to Chicago, IL someday soon. Some would say that's a downgrade, at least in weather quality, but I'm focused as hell to get there. If you're from Chicago, I'd love to <MiscLinks href="contact.html">hear from you</MiscLinks>!
              </AboutContent>
              <AboutContent>
                Some hobbies of mine include music and sports. I play guitar and sing a bit. I also really really love sports. All Chicago-based teams are my favorite (except the White Sox, of course).
              </AboutContent>
            </AboutSection>
          </Body>

          <Footer backgroundIsBlack={false} />

        </MainContent>
      </Container>
    );
  }
}

export default About;
